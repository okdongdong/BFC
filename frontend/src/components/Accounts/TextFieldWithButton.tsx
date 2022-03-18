import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
}));

interface TextFieldWithButtonProps {
  id: string;
  onChange: any;
  onClickButton: any;
  disabled: any;
  buttonText: string;
  label: string;
  helperText?: string;
  autoComplete?: string;
}

function TextFieldWithButton({
  id,
  onChange,
  onClickButton,
  autoComplete = "",
  buttonText,
  label,
  helperText = "",
  disabled,
}: TextFieldWithButtonProps) {
  const classes = useStyles();

  return (
    <FormControl
      className={(classes.form, classes.paper)}
      variant="outlined"
      error={!!helperText}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        fullWidth
        id={id}
        name={id}
        autoComplete={autoComplete}
        autoFocus
        onChange={onChange}
        disabled={disabled}
        aria-describedby={`${id}-helper-text`}
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
        labelWidth={50}
      />
      <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default TextFieldWithButton;
