# noodle-utils *1.0.2*



### src/dynamoPersistanceQueue.js


#### new DynamoPersistanceQueue() 

Creates a new Queue for pushing data to Dynamo.






##### Returns


- `Void`



#### DynamoPersistanceQueue.constructor(dynamoCredentials) 

Constructor for DynamoPersistanceQueue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dynamoCredentials | `DynamoCredentials`  | - the credentials for your Dynamo table | &nbsp; |




##### Returns


- `Void`



#### DynamoPersistanceQueue.push(item) 

Method to push items to our queue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `object`  | - Any item that we want to push to Dynamo | &nbsp; |




##### Returns


-  Nothing



#### DynamoPersistanceQueue.pushBatch(batch) 

Method to push items to our queue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| batch | `Array.<object>`  | - A batch of items to push into the queue | &nbsp; |




##### Returns


-  Nothing




### src/sleep.js


#### sleep(time) 

Method to handle sequential tasks that rely on the output of the previous task




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| time | `number`  | - The time, in ms, to sleep for | &nbsp; |




##### Returns


-  Nothing




### src/pipeline.js


#### pipeline(fns) 

Method to handle sequential tasks that rely on the output of the previous task




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fns | `Array.<Function>`  | - The functions you would like to run over the input | &nbsp; |




##### Returns


- `any`  The result of the pipeline processing



#### pipelineClosureMethod(func, args) 

This method allows you to pass more arguments through the pipeline via a closure




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| func |  | - The method you want to run in the pipeline | &nbsp; |
| args | `any`  | - the closure args you want to use in the method | &nbsp; |




##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
