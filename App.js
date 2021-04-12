import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Container, Header, Content, Badge, Text, Icon, Body } from 'native-base';
import { FloatingAction } from 'react-native-floating-action';


import NewNote from './containers/NewNote';
import ListNotes from './containers/ListNotes';
import ViewNote from './containers/ViewNote';

import firebase from 'firebase';


const actions = [
  {
    text: "Create Note",
    icon: {uri: "https://www.pngkit.com/png/full/154-1545388_project-thumbnail-plus-icon-queensland-government-logo-white.png"},
    name: "bt_new_note",
    position: 2
  },
];

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalNewNote: false,
      modalViewNote: false,
      selectedNote: '',
      guardNewNote: false,
    }

    this.handleModalNewNote = this.handleModalNewNote.bind(this);
    this.handleModalViewNote = this.handleModalViewNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeSubtitle = this.changeSubtitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }

  handleModalNewNote () {
    var value = this.state.modalNewNote;
    if (value) {
      this.setState({selectedNote: ''})
    }
    this.setState({modalNewNote: !value});
  }

  handleModalViewNote () {
    var value = this.state.modalViewNote;
    
    if (value) {
      this.setState({guardNewNote: false})
      this.setState({selectedNote: ''});
    }
    this.setState({modalViewNote: !value});
  }

  selectNote(note) {
    this.setState({selectedNote: note});
    this.handleModalViewNote();
  }

  editNote (note) {
    this.setState({modalViewNote: false});
    this.setState({guardNewNote: true});
  }

  deleteNote(note) {
    this.handleModalViewNote();
    firebase.database().ref(`notes/${note.id}`).remove();
    this.setState({selectedNote: ''});
  }

  changeTitle(text) {
      var selectedNote = {...this.state.selectedNote};
      selectedNote.title = text;
      this.setState({selectedNote});
  }

  changeSubtitle(text) {
      var selectedNote = {...this.state.selectedNote};
      selectedNote.subtitle = text;
      this.setState({selectedNote});
  }

  changeContent(text) {
      var selectedNote = {...this.state.selectedNote};
      selectedNote.content = text;
      this.setState({selectedNote});
  }

  render() {
    return (
      <Container>
        <Header>
          <Body><Text>Note Application</Text></Body>
        </Header>

        <Content>
          <ListNotes selectNote={this.selectNote} ></ListNotes>
        </Content>

        <ViewNote
          active={this.state.modalViewNote}
          handle={this.handleModalViewNote}
          note={this.state.selectedNote}
          edit={this.editNote}
          delete={this.deleteNote}
          guardNewNote={this.state.guardNewNote}
          openEdit={this.handleModalNewNote}
        />
        
        <NewNote 
        note={this.state.selectedNote} 
        active={this.state.modalNewNote} 
        handle={this.handleModalNewNote}
        changeTitle={this.changeTitle}
        changeSubtitle={this.changeSubtitle}
        changeContent={this.changeContent}
        />

        <FloatingAction
          actions={actions}
          overrideWithAction={true}
          onPressItem={ this.handleModalNewNote }
        />
      </Container>
      );
  }
}
