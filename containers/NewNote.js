import React from 'react';
import { Component } from 'react';
import Modal from 'react-native-modal';
import { TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native';
import { Form, Item, Input, Button, Text, Label, Textarea } from 'native-base';


import firebase from 'firebase';

export class NewNote extends Component {

    constructor(props){
        super(props);
        this.state = {
            note: {
                title: '',
                subtitle: '',
                content: '',

                createdAt: '',
                updatedAt: '',
            } 
        }

        this.submit = this.submit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    

    closeModal () {
        this.setState({note: {
            title: '',
            subtitle: '',
            content: '',

            createdAt: '',
            updatedAt: '',
        }});

        this.props.handle();
    }

    submit () {
        
        var note = {...this.props.note};
        
        if (note.createdAt !== undefined) {
            note.updatedAt = Date.now();
            firebase.database().ref(`notes/${note.id}`).set(note);
        }
        else {
            note.createdAt = Date.now();
            var newNote = firebase.database().ref('notes').push();
            note.id = newNote.key;

            newNote.set(note);
        }

        this.closeModal();
    }

    render() {
        const note = this.props.note;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Modal isVisible={this.props.active} onBackdropPress={this.closeModal}>
                    <Form style={styles.modalView}>
                    <Text>New Note</Text>
                        <Item regular  floatingLabel>
                            <Label>Title</Label>
                            <Input value={note.title} onChangeText={this.props.changeTitle} placeholder="Title" />
                        </Item>
                        <Item regular floatingLabel>
                            <Label>Subtitle</Label>
                            <Input value={note.subtitle} onChangeText={this.props.changeSubtitle} placeholder="Subtitle" />
                        </Item>

                        <Item>
                            <Textarea style={{width: "100%"}} rowSpan={5} bordered value={note.content} onChangeText={this.props.changeContent} placeholder="Content" />
                        </Item>
                        <Button style={{position: 'absolute', bottom: 10, right: 20}} onPress={this.submit} primary block><Text>Save</Text></Button>
                    </Form>
                </Modal>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        width: 200,
        borderWidth: 1,
    },
})

export default NewNote;