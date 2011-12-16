{
	urlProxy: "index.php",
	urlFramework: "js-i2b2/",
	//-------------------------------------------------------------------------------------------
	// THESE ARE ALL THE DOMAINS A USER CAN LOGIN TO
	lstDomains: [
		{ 
		  domain: "i2b2demo",
		  name: "I2B2 1.6 Query/Analysis",
		  urlCellPM: "http://127.0.0.1:8080/i2b2/rest/PMService/",
		  allowAnalysis: true,
		  adminOnly: false,
		  debug: true,
		  isSHRINE: false
			},
		{ 
		  domain: "i2b2demo",
		  name: "I2B2 1.6 Admin",
		  urlCellPM: "http://127.0.0.1:8080/i2b2/rest/PMService/",
		  allowAnalysis: true,
		  adminOnly: false,
		  debug: true,
		  isSHRINE: false
			},
	]
	//-------------------------------------------------------------------------------------------
}
