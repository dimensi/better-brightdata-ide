bridge-build:
	cd ./bridge-script && yarn build;

content-build:
	cd ./content-script && yarn build;

clean:
	rm ./extension/*.js
	rm ./extension/*.css

build: clean bridge-build content-build