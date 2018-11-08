cd src/api.contract
yarn link
cd ../src/auth.contract
yarn link
cd ../src/front.core
yarn link
cd ../api
yarn link auth.contract
yarn link api.contract
cd ../auth
yarn link auth.contract
cd ../front.core
yarn link api.contract
yarn link front.core