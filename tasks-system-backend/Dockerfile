FROM openjdk:17-jdk-alpine

ARG JAR_FILE=task-system-backend
COPY task-system-backend.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]

# build image command:          docker build -t tasksystembackendimg .
# create a container with app:  docker run -p 8081:8088 tasksystembackendimg
