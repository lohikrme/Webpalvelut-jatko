# nest new L06a_cities_graphql

npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql

npm install uuid dotenv

nest generate module cities
nest generate service cities
nest generate resolver cities

nest generate module locations
nest generate service locations
nest generate resolver locations

npm install @nestjs/typeorm typeorm mysql2
npm install mysql2