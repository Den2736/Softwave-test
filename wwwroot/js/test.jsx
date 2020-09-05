class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], year: 2018 };
    }

    onYearChanged = changeEvent => {
        this.setState({
            year: changeEvent.target.value
        });
    };

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.apiUrl, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data.data });
        };
        xhr.send();
    }

    render() {
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);

        const self = this;
        const colors = this.colorSet();
        var yearData = this.state.data
            .filter(yearData => (yearData.year == this.state.year));

        return (
            <div className="Box row">
                <div className="col-6 row p-0">
                    {
                        yearData
                            .map(yearData => (yearData.categories))
                            .map(categories => categories
                                .map((category, idx) =>
                                    (
                                        <CategorySales
                                            elem_id={"category-" + category.title}
                                            category={category}
                                            color={colors[idx]}
                                            key={"category-" + category.title} />
                                    )))
                    }
                </div>

                <div className="col-5 row mx-auto">
                    <TotalSalesGauge data={yearData} />
                    <PlanGauge data={yearData} />
                </div>

                <div className="col-1 align-self-center">
                    <YearSelector data={this.state.data} onYearChanged={self.onYearChanged} />
                </div>
            </div>
        );
    }

    colorSet() {
        let colors = [];
        var gradient;

        gradient = new am4core.LinearGradient();
        gradient.stops.push({ color: am4core.color("#337267") })
        gradient.stops.push({ color: am4core.color("#409075") })
        colors.push(gradient);

        gradient = new am4core.LinearGradient();
        gradient.stops.push({ color: am4core.color("#C971DF") })
        gradient.stops.push({ color: am4core.color("#422ABC") })
        colors.push(gradient);

        gradient = new am4core.LinearGradient();
        gradient.stops.push({ color: am4core.color("#DA3464") })
        gradient.stops.push({ color: am4core.color("#FE413D") })
        colors.push(gradient);

        gradient = new am4core.LinearGradient();
        gradient.stops.push({ color: am4core.color("#1AD0AA") })
        gradient.stops.push({ color: am4core.color("#06B1B9") })
        colors.push(gradient);

        gradient = new am4core.LinearGradient();
        gradient.stops.push({ color: am4core.color("#F5AD47") })
        gradient.stops.push({ color: am4core.color("#F86A18") })
        colors.push(gradient);

        gradient = new am4core.LinearGradient();
        gradient.stops.push({ color: am4core.color("#CB102F") })
        gradient.stops.push({ color: am4core.color("#DD1F1F") })
        colors.push(gradient);

        gradient = new am4core.LinearGradient();
        gradient.stops.push({ color: am4core.color("#B97DA3") })
        gradient.stops.push({ color: am4core.color("#6381DB") })
        colors.push(gradient);

        gradient = new am4core.LinearGradient();
        gradient.stops.push({ color: am4core.color("#19ADCB") })
        gradient.stops.push({ color: am4core.color("#4A4E8B") })
        colors.push(gradient);

        return colors;
    }
}


class CategorySales extends React.Component {

    drawBar = function (elem_id) {
        const self = this;
        am4core.ready(function () {

            // create chart
            var chart = am4core.create(elem_id, am4charts.XYChart);
            window.CategorySales = chart;
            chart.padding(5, 5, 10, 20);

            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "title";
            categoryAxis.renderer.opposite = true;
            categoryAxis.renderer.grid.template.disabled = true;
            categoryAxis.renderer.labels.template.fill = am4core.color("#969696");
            categoryAxis.renderer.labels.template.textAlign = 'end';
            categoryAxis.renderer.labels.template.marginLeft = 15;
            categoryAxis.paddingTop = 15;

            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.max = 10;
            valueAxis.strictMinMax = true
            valueAxis.renderer.maxLabelPosition = -1
            valueAxis.renderer.grid.template.disabled = true;
            valueAxis.renderer.baseGrid.disabled = true;
            valueAxis.renderer.inversed = true;

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.categoryY = "title";
            series.dataFields.valueX = "MAU";
            series.columns.template.strokeOpacity = 0;
            series.columns.template.column.cornerRadiusBottomRight = 20;
            series.columns.template.column.cornerRadiusTopRight = 20;
            series.columns.template.column.cornerRadiusBottomLeft = 20;
            series.columns.template.column.cornerRadiusTopLeft = 20;
            series.paddingTop = 15

            var gradient = new am4core.LinearGradient();
            gradient.stops.push({ color: am4core.color("#422ABC") })
            gradient.stops.push({ color: am4core.color("#C971DF") })
            series.fill = self.props.color;

            var labelBullet = series.bullets.push(new am4charts.LabelBullet())
            labelBullet.label.text = "{values.valueX.workingValue}";
            labelBullet.label.fill = am4core.color("#969696");
            labelBullet.label.horizontalCenter = "left";
            labelBullet.locationX = 1;
            labelBullet.label.dx = -20;
            labelBullet.label.dy = -2;

            let bgSeries = chart.series.push(new am4charts.ColumnSeries())
            bgSeries.dataFields.valueX = "max"
            bgSeries.dataFields.categoryY = "title"
            bgSeries.clustered = false
            bgSeries.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground")
            bgSeries.columns.template.fillOpacity = 0.08
            bgSeries.columns.template.strokeWidth = 0
            bgSeries.columns.template.column.cornerRadiusBottomRight = 20;
            bgSeries.columns.template.column.cornerRadiusTopRight = 20;
            bgSeries.columns.template.column.cornerRadiusBottomLeft = 20;
            bgSeries.columns.template.column.cornerRadiusTopLeft = 20;
            bgSeries.paddingTop = 15


            chart.data = [
                {
                    "title": self.props.category.title,
                    "MAU": self.props.category.value,
                    "max": self.props.category.maxValue
                }
            ]
        });
    }
    render() {
        return (
            <div className="CategorySales col-6 pr-0" id={this.props.elem_id}></div>
        );
    }
    componentDidMount() {
        this.drawBar(this.props.elem_id);
    }
    componentDidUpdate() {
        this.drawBar(this.props.elem_id);
    }
}


class TotalSalesGauge extends React.Component {

    drawGauge = function (elem_id) {
        const self = this;
        am4core.ready(function () {
            let chart = am4core.create(elem_id, am4charts.RadarChart)
            window.planGauge = chart;

            chart.startAngle = -90
            chart.endAngle = 270
            chart.innerRadius = am4core.percent(85)

            var title = chart.titles.create();
            title.text = "Products saled";
            title.fontSize = 15;
            title.marginBottom = 7;
            title.fill = am4core.color("#969696");

            let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
            categoryAxis.dataFields.category = "category"
            categoryAxis.renderer.grid.template.strokeOpacity = 0

            let valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
            valueAxis.renderer.grid.template.strokeOpacity = 0
            valueAxis.renderer.maxLabelPosition = -1
            valueAxis.min = 0
            valueAxis.max = 100
            valueAxis.strictMinMax = true

            var gradient = new am4core.LinearGradient();
            gradient.stops.push({ color: am4core.color("#303030") })
            gradient.stops.push({ color: am4core.color("#9464B8") })
            gradient.stops.push({ color: am4core.color("#3729A4") })
            window.gradient = gradient;

            let series = chart.series.push(new am4charts.RadarColumnSeries())
            series.dataFields.valueX = "value"
            series.dataFields.categoryY = "category"
            series.clustered = false
            series.columns.template.strokeWidth = 0
            series.columns.template.radarColumn.cornerRadius = 20
            series.fill = gradient;

            if (self.props.data.length) {

                var circle = self.props.data.map(d => d.circle2).reduce((s, x) => x);

                var label1 = chart.radarContainer.createChild(am4core.Label);
                label1.horizontalCenter = "right";  // inverted, wtf? 
                label1.verticalCenter = "middle";
                label1.fill = am4core.color("#969696");
                label1.fontSize = 30;
                label1.text = circle.value;

                var label2 = chart.radarContainer.createChild(am4core.Label);
                label2.horizontalCenter = "left";
                label2.verticalCenter = "middle";
                label2.fill = am4core.color("#797979");
                label2.fontSize = 20;
                label2.text = '/' + circle.maxValue;
            }

            chart.data = [
                { "category": "", "value": 70, "full": 100 }
            ];
        });
    }
    render() {
        return (
            <div className="TotalSalesGauge col-6" id="total_sales_gauge"></div>
        );
    }
    componentDidMount() {
        this.drawGauge("total_sales_gauge");
    }
    componentDidUpdate() {
        this.drawGauge("total_sales_gauge");
    }
}
class PlanGauge extends React.Component {

    drawGauge = function (elem_id) {
        const self = this;
        am4core.ready(function () {
            let chart = am4core.create(elem_id, am4charts.RadarChart)
            window.planGauge = chart;

            chart.startAngle = -90
            chart.endAngle = 270
            chart.innerRadius = am4core.percent(85)

            var title = chart.titles.create();
            title.text = "Plan";
            title.fontSize = 15;
            title.marginBottom = 7;
            title.fill = am4core.color("#969696");

            let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
            categoryAxis.dataFields.category = "category"
            categoryAxis.renderer.grid.template.strokeOpacity = 0

            let valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
            valueAxis.renderer.grid.template.strokeOpacity = 0
            valueAxis.renderer.maxLabelPosition = -1
            valueAxis.min = 0
            valueAxis.max = 100
            valueAxis.strictMinMax = true

            var gradient = new am4core.LinearGradient();
            window.gradient = gradient;
            gradient.stops.push({ color: am4core.color("#303030") })
            gradient.stops.push({ color: am4core.color("#0DC8AB") })
            gradient.stops.push({ color: am4core.color("#06ABA7") })

            let series = chart.series.push(new am4charts.RadarColumnSeries())
            series.dataFields.valueX = "value"
            series.dataFields.categoryY = "category"
            series.clustered = false
            series.columns.template.strokeWidth = 0
            series.columns.template.radarColumn.cornerRadius = 20
            series.fill = gradient;

            if (self.props.data.length) {

                var circle = self.props.data.map(d => d.circle1).reduce((s, x) => x);

                var label1 = chart.radarContainer.createChild(am4core.Label);
                label1.horizontalCenter = "middle";
                label1.verticalCenter = "middle";
                label1.fill = am4core.color("#969696");
                label1.fontSize = 25;
                label1.fontWeight = 500;
                label1.text = circle.value + "%";
            }

            chart.data = [
                { "category": "", "value": 70, "full": 100 }
            ];
        });
    }
    render() {
        return (
            <div className="PlanGauge col-6" id="plan_gauge"></div>
        );
    }
    componentDidMount() {
        this.drawGauge("plan_gauge");
    }
    componentDidUpdate() {
        this.drawGauge("plan_gauge");
    }
}

class YearSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = { year: 2018 };
    }

    onYearChanged = changeEvent => {
        this.setState({
            year: changeEvent.target.value
        });
        this.props.onYearChanged(changeEvent);
    };

    render() {
        const self = this;

        return (
            <div className="YearSelector float-right">
                {
                    this.props.data.map(function (yearData, idx) {
                        const year = yearData.year;
                        return (
                            <div className="form-check" key={idx}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="year"
                                    id={"year-" + idx}
                                    value={year}
                                    checked={self.state.year == year}
                                    onChange={self.onYearChanged} />
                                <label
                                    className="form-check-label"
                                    htmlFor={"year-" + idx} >
                                    {year}
                                </label>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

ReactDOM.render(
    <Box apiUrl="/api/sales" />,
    document.getElementById('content')
);