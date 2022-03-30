import { Chip, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import TextFieldWithButton from "../../Accounts/TextFieldWithButton";
interface CompanionListProps {
  listLabel?: string;
  companionList: Array<string>;
  setCompanionList: React.Dispatch<React.SetStateAction<string[]>>;
}

function CompanionList({
  listLabel = "",
  companionList,
  setCompanionList,
}: CompanionListProps) {
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onDeleteHandler = (idx: number) => {
    const newCompanionList = [...companionList];
    newCompanionList.splice(idx, 1);
    setCompanionList(newCompanionList);
  };

  const onClickHandler = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!email || emailRegex.test(email)) {
      setEmailMessage("");

      const newCompanionList = [...companionList];
      newCompanionList.push(email);
      setCompanionList(newCompanionList);
      setEmail("");
    } else {
      setEmailMessage("이메일 형식이 틀렸습니다.");
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetEmail = event.target.value;
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!targetEmail || emailRegex.test(targetEmail)) {
      setEmailMessage("");
    } else {
      setEmailMessage("이메일 형식이 틀렸습니다.");
    }
    setEmail(targetEmail);
  };

  return (
    <div>
      <div>{listLabel}</div>
      <TextFieldWithButton
        id="conpanion-list-input"
        onChange={onChangeHandler}
        onClickButton={onClickHandler}
        autoComplete=""
        buttonText={"등록"}
        label={"동행자의 이메일을 입력하세요"}
        helperText={emailMessage}
        disabled={false}
        value=""
      ></TextFieldWithButton>

      {/* 여기 다시만들어야댐
 <FormControl
      className={(classes.form, classes.paper)}
      variant="outlined"
      error={!!helperText}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        label={label}
        fullWidth
        id={id}
        name={id}
        autoComplete={autoComplete}
        autoFocus
        onChange={onChange}
        disabled={disabled}
        aria-describedby={`${id}-helper-text`}
        defaultValue={value}
        endAdornment={
          <InputAdornment position="end">
            <Button
              onClick={onClickButton}
              color="primary"
              variant="contained"
              disabled={!!helperText}
            >
              {disabled ? `${label} 재작성` : buttonText}
            </Button>
          </InputAdornment>
        }
      />
      <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
    </FormControl> */}

      <Stack direction="column" spacing={1}>
        {companionList.map((keyword, idx) => (
          <Chip
            variant="outlined"
            label={keyword}
            key={idx}
            onDelete={() => onDeleteHandler(idx)}
          ></Chip>
        ))}
      </Stack>
    </div>
  );
}

export default CompanionList;
