FROM python:3.9

# Create somewhere for the application to live.
RUN mkdir -p /app
WORKDIR /app

# Install the dependencies required to run the app.
ADD requirements.txt /app
RUN pip install -r requirements.txt

# Add the actual code itself and tell Docker what to run by default when the container is started.
ADD main.py /app
CMD ["python", "main.py"]