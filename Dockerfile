FROM python:3.11

WORKDIR /app

COPY manage.py .
COPY requirements.txt .
COPY citrouille .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "manage.py", "runserver"]