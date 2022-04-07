FROM python:3.7.9
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .
# CMD ["python3", "manage.py", "makemigrations"]
# CMD ["python3", "manage.py", "migrate"]


# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "stock.wsgi:application"]
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8444", "--noreload"]