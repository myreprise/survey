queue()
    .defer(d3.json, "/api/data")
    .await(makeGraphs);

function makeGraphs(error, apiData) {

	//Start Transformations
	var dataSet = apiData;

	/*
	dataSet.forEach(function(d){
		d.total_exp += d.retail_exp + d['f&b_exp'] + d.leisure_exp;
	})
	*/

	//Create a Crossfilter instance
	var ndx = crossfilter(dataSet);

	//Define Dimensions
	var gender = ndx.dimension(function(d){ return d.sex; });
	var income = ndx.dimension(function(d){ return d.income; });
	var occupation = ndx.dimension(function(d){ return d.occup; });
	var education = ndx.dimension(function(d){ return d.educ; });
	var membership = ndx.dimension(function(d){ return d.member_type; });

	//Calculate metrics
	var respondentsByGender = gender.group();
	var respondentsByIncome = income.group();
	var respondentsByOccupation = occupation.group();
	var respondentsByEducation = education.group();
	var respondentsByMembership = membership.group();

	var all = ndx.groupAll();

	//Calculate Groups

	//Define threshold values for data


	//Charts
	var genderChart = dc.pieChart("#gender-chart");
	var occupationChart = dc.rowChart("#occupation-chart");
	var totalRespondents = dc.numberDisplay("#total-respondents");
	var educationChart = dc.barChart("#education-chart");
	var incomeChart = dc.barChart("#income-chart");
	var membershipChart = dc.pieChart("#member-chart");
	var selectField = dc.selectMenu("#menuselect");


  selectField
  	.dimension(gender)
    .group(respondentsByGender); 

       dc.dataCount("#row-selection")
        .dimension(ndx)
        .group(all);


	genderChart
		.height(220)
		.width(220)
		.radius(90)
		.innerRadius(40)
		.transitionDuration(1000)
		.dimension(gender)
		.group(respondentsByGender);


	occupationChart
        .width(400)
        .height(220)
        .dimension(occupation)
        .group(respondentsByOccupation)
        .elasticX(true)
        .xAxis().ticks(5)

    educationChart
    	.width(600)
    	.height(220)
    	.transitionDuration(1000)
    	.dimension(education)
    	.group(respondentsByEducation)
    	.centerBar(false)
    	.gap(5)
    	.elasticY(true)
    	.x(d3.scale.ordinal().domain(education))
    	.xUnits(dc.units.ordinal)
    	.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
    	.ordering(function(d){ return -d.value; })
    	.yAxis().tickFormat(d3.format("s"));

    incomeChart
    	.width(600)
    	.height(220)
    	.transitionDuration(1000)
    	.dimension(income)
    	.group(respondentsByIncome)
    	.centerBar(false)
    	.gap(5)
    	.elasticY(true)
    	.x(d3.scale.ordinal().domain(education))
    	.xUnits(dc.units.ordinal)
    	.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
    	.ordering(function(d){ return -d.value; })
    	.yAxis().tickFormat(d3.format("s"));

    membershipChart
		.height(220)
		.width(220)
		.radius(90)
		.innerRadius(40)
		.transitionDuration(1000)
		.dimension(membership)
		.group(respondentsByMembership);

    totalRespondents
    	.formatNumber(d3.format("d"))
    	.valueAccessor(function(d){ return d;})
    	.group(all);


	dc.renderAll();

};