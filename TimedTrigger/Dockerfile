FROM mcr.microsoft.com/azure-functions/python:4

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

# Add the MariaDB client tools and development library.
RUN apt update && apt upgrade -y && apt install -y mariadb-client libmariadb-dev gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /
RUN pip install --progress-bar off --upgrade pip && pip install --progress-bar off -r /requirements.txt

COPY . /home/site/wwwroot/