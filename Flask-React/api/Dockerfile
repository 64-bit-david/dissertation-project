# syntax=docker/dockerfile:1
FROM python:3.10.2-slim-bullseye
WORKDIR /app
# change
# ADD * /app
# 
RUN apt update && apt upgrade -y && apt install -y mariadb-client libmariadb-dev gcc && rm -rf /var/lib/apt/lists/* 
RUN pip3 install nltk
RUN [ "python", "-c", "import nltk; nltk.download('vader_lexicon')" ]
COPY . .
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt
CMD [ "python3", "-u", "app.py" ]
