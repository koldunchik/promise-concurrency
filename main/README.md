#  Bluebird Promise.map with concurrency #

* The concurrency limit applies to Promises returned 
by the mapper function and it basically limits the 
number of Promises created.
* For example, if concurrency is 3 and the mapper callback 
has been called enough so that there are three returned 
Promises currently pending, no further callbacks are called 
until one of the pending Promises resolves.
* So the mapper function will be called three times and 
it will be called again only after at least one of the 
Promises resolves.