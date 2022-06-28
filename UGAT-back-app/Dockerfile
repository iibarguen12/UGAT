FROM openjdk:11-jre-slim

ENV APP_HOME=/ugat-back-app/

COPY ./target/supportportal.jar $APP_HOME/
WORKDIR $APP_HOME

ENV JAR_FILE=supportportal.jar

RUN mv ${JAR_FILE} /supportportal.jar

ENTRYPOINT ["java", "-jar", "/supportportal.jar"]