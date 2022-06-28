FROM nginx:latest
COPY /dist/UGAT-front-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY /certs/ghgcity_al.crt /etc/data/nginx/certs/ghgcity_al.crt
COPY /certs/ghgcity_al.key /etc/data/nginx/certs/ghgcity_al.key