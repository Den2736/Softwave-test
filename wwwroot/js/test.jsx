class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.apiUrl, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    }
    render() {
        return (
            <div className="Box">
                {
                    //JSON.stringify(this.state.data)
                }
            </div>
        );
    }
}

ReactDOM.render(
    <Box apiUrl="/api/sales" />,
    document.getElementById('content')
);