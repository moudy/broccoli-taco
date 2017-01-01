
clean:
	rm -rf node_modules
	rm -rf test/sites/basic/node_modules
	rm -rf test/sites/dynamic/node_modules
	rm -rf test/sites/mounted/node_modules

test: node_modules
	npm link
	# basic 
	cd test/sites/basic/; \
	npm install; \
	npm link broccoli-taco
	# dynamic 
	cd test/sites/dynamic/; \
	npm install; \
	npm link broccoli-taco
	# mounted 
	cd test/sites/mounted/; \
	npm install; \
	npm link broccoli-taco
	npm test 

node_modules: package.json
	npm install

.PHONY: test clean link_local
