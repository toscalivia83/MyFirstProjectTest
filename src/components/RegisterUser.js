import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  Button,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase({ name: 'UserDatabase.db' });

// const RegisterUser = ({ navigation }) => {
const RegisterUser = () => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [users, setUsers] = useState([]);

  select = () => {
    console.log(123);
    executeSql('select * from table_user', null)
      .then(items => {
        console.log('items', items);
      });
  }

  const register_user = async () => {
    await _register_user();

    db.transaction(
      tx => {
        tx.executeSql('select * from table_user',
        null,
        (_, { rows }) => {

          console.log(JSON.stringify(rows)),(a,b)=>console.log(b)
          console.log("rows", setUsers);
          setUsers(rows);
        });
        console.log("exit register user");
      }
    )

  }

  const get_users = () => {
    // db.transaction(
    //   tx => {
    //     console.log("users", users);
    //     tx.executeSql(
    //       'select * from table_user',
    //       null,
    //       (tx, results) => {
    //         console.log("Executed query", tx, results);
    //       },
    //       (tx, error) => {
    //         console.log("Could not execute query", tx, error);
    //       }
    //     );
    //     console.log("exit get users");
    //   }
    // )

    console.log('get users');

    db.transaction(
      tx => {
        tx.executeSql('select * from table_user', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null
    );


  }

  let _register_user = async () => {
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists table_user (user_name text, user_contact text, user_address text);',[],()=>console.log("creeeated"),(a,b)=>console.log(b)
      )
      console.log("created table account ");
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log("Executed query", tx, results);
        },
        (tx, error) => {
          console.log("Could not execute query", tx, error);
        }
      );
      console.log(1234);
    })
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <TextInput
                placeholder="Enter Name"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{ padding: 10 }}
              />
              <TextInput
                placeholder="Enter Contact No"
                onChangeText={
                  (userContact) => setUserContact(userContact)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <TextInput
                placeholder="Enter Address"
                onChangeText={
                  (userAddress) => setUserAddress(userAddress)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Button title="Submit" onPress={register_user} />
              <Button title="Display" onPress={get_users} />
              {users.map(user => {
                <Text>{user.user_name}</Text>
              })}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          Example of SQLite Database in React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;