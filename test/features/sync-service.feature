Feature: Basic synchronization mechanism
For keeping application message in sync
Scenario: Publish message to broker
	Given a valid json
	When sync api is invoke with POST
	Then message should be validated and published to broker