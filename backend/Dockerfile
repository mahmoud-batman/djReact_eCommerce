# Pull base image
FROM python:3.6

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app/backend

# Install dependencies
COPY requirements.txt /app/backend/
RUN pip install -r requirements.txt


# Copy project
COPY . /app/backend/

# Set the default port for the container
EXPOSE 8000
# Set the default command for the container
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
