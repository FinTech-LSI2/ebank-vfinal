# Use a lightweight OpenJDK image



FROM  ayman909/customjdk:v1  AS BUILD_IMAGE
COPY . .
RUN mvn clean package




FROM ayman909/customjdk:v1

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file into the container
COPY --from=BUILD_IMAGE target/*.jar gateway.jar

# Expose the Gateway's default port


# Set the default command to run the application
CMD ["java", "-jar", "gateway.jar"]
