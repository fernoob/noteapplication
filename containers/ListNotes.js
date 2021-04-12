import React from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
import firebase from 'firebase';

export default class ListNotes extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            notes: [],
        }
    }

    componentDidMount() {
        const that = this;
        firebase.database().ref('/notes').on('value', function(snapshot) {
            if (snapshot.numChildren() > 0) {
                var arraylist = Object.values(snapshot.val()).map(item => item);
                that.setState({loading: false, notes: arraylist});
            }
            else {
                that.setState({loading: false, notes: []});
            }
        }) 
    }
    
    render() {

        return (
            <Container>
                <Content>
                <List>
                    { this.state.notes.map(item => {return <ListItem key={item.id} onPress={() => this.props.selectNote(item)}><Text>{item.title}</Text></ListItem>}) }
                </List>
                </Content>
            </Container>
        );
    }
}