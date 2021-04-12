import React from 'react';
import { Component } from 'react';
import Modal from 'react-native-modal';
import { TouchableWithoutFeedback, StyleSheet, Keyboard, View, ScrollView } from 'react-native';
import { Button, Text, CardItem, Card, Body, Content, Container } from 'native-base';
import { MarkdownView } from 'react-native-markdown-view'

export class ViewNote extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const note = this.props.note;

        return (

            <Modal onModalHide={ this.props.guardNewNote ? this.props.openEdit : () => {} } isVisible={this.props.active} onBackdropPress={this.props.handle} style={{ flex: 1 }}>

                <Container style={styles.modalView}>
                    <Content style={{ flex: 1 }}>
                        <View  style={{ flex: 1, }}>
                            <ScrollView>
                            <Card style={{width: '100%'}}>
                                <CardItem header bordered>
                                    <Text>Title</Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Body>
                                        <Text>{note?.title}</Text>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{width: '100%'}}>
                                <CardItem header bordered>
                                    <Text>Subtitle</Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Body>
                                        <Text>{note?.subtitle}</Text>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{width: '100%'}}>
                                <CardItem header bordered>
                                    <Text>Content</Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Body>
                                        <MarkdownView>{note?.content}</MarkdownView>
                                    </Body>
                                </CardItem>
                            </Card>
                
                            <Card style={{width: '100%'}}>
                                <CardItem header bordered>
                                    <Text>Details</Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Body>
                                        {note?.createdAt === undefined ? <></> : <Text>Created at: { new Date(note?.createdAt).toLocaleDateString("pt-PT") +" - "+ new Date(note?.createdAt).toLocaleTimeString("pt-PT")}</Text> }
                                        {note?.updatedAt === undefined ? <></> : <Text>Updated at: { new Date(note?.updatedAt).toLocaleDateString("pt-PT") +" - "+ new Date(note?.updatedAt).toLocaleTimeString("pt-PT")}</Text> }     
                                    </Body>
                                </CardItem>
                            </Card>
                            
                            </ScrollView>
                            </View>
                    </Content>
                </Container>
                    
                <Button onPress={() => this.props.edit(note)} primary block><Text>Edit</Text></Button>    
                <Button onPress={() => this.props.delete(note)} danger block><Text>Delete</Text></Button>

            </Modal>
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
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        width: 200,
        borderWidth: 1,
    },
})

export default ViewNote;