{
	urlProxy: "index.php",
	urlFramework: "js-i2b2/",
	//-------------------------------------------------------------------------------------------
	// THESE ARE ALL THE DOMAINS A USER CAN LOGIN TO
	lstDomains: [
		{ 
		  domain: "i2b2demo",
		  name: "I2B2 Query and Analysis",
		  urlCellPM: "http://127.0.0.1:8080/i2b2/rest/PMService/",
		  allowAnalysis: true,
		  adminOnly: false,
		  debug: false,
		  isSHRINE: true
			},
		{ 
		  domain: "i2b2demo",
		  name: "I2B2 Admin",
		  urlCellPM: "http://127.0.0.1:8080/i2b2/rest/PMService/",
		  allowAnalysis: false,
		  adminOnly: true,
		  debug: false,
		  isSHRINE: true
		}
	]
	//-------------------------------------------------------------------------------------------
}
