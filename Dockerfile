

# Stage 2: Serve the Angular app
FROM nginx

# Copy the built Angular app to the Nginx container
COPY  /dist/e-bank/browser /usr/share/nginx/html/

# Expose the port that the app will be served on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
