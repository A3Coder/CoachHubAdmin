import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import axios from 'axios'; // Import Axios for making HTTP requests

// Assuming you have an API endpoint for sending timetable data
const API_URL = 'https://example.com/api/timetable';

const TimetableScreen = () => {
  const navigation = useNavigation();

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [timetableData, setTimetableData] = useState([]);
  const [period, setPeriod] = useState('');
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [teacher, setTeacher] = useState('');
  const [isUpdatePressed, setIsUpdatePressed] = useState(false); // State to track if the "UPDATE TIMETABLE" button is pressed

  // Function to add a new timetable entry
  const addTimetableEntry = () => {
    if (!selectedDay || !selectedClass || !period || !subject || !startTime || !endTime || !teacher) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Check if there is already an entry with the same period for the same day and class
    const isDuplicateEntry = timetableData.some(
      entry => entry.day === selectedDay && entry.class === selectedClass && entry.period === period
    );

    if (isDuplicateEntry) {
      Alert.alert('Error', 'Timetable entry with the same period already exists for this day and class');
      return;
    }

    setTimetableData([
      ...timetableData,
      {
        day: selectedDay,
        class: selectedClass,
        period: period,
        subject: subject,
        time: `${startTime} - ${endTime}`,
        teacher: teacher,
      },
    ]);
    setPeriod('');
    setSubject('');
    setStartTime('');
    setEndTime('');
    setTeacher('');
  };

  // Function to send timetable data to the backend
  const sendTimetableData = async () => {
    try {
      // const response = await axios.post(API_URL, {
      //   class: selectedClass,
      //   timetable: timetableData,
      // });
      // Handle success response
      Alert.alert('Success', 'Timetable updated successfully');
      console.log('Timetable Entries Data:', timetableData); // Print timetable entries data to console
      setIsUpdatePressed(true); // Set state to indicate that "UPDATE TIMETABLE" button is pressed
      setTimetableData([]);
    } catch (error) {
      // Handle error
      console.error('Error updating timetable:', error);
      Alert.alert('Error', 'Failed to update timetable');
    }
  };

  // Function to clear timetable entries
  const clearTimetableEntries = () => {
    setTimetableData([]);
  };

  return (
    <>
      <StatusBar backgroundColor="#4477BB" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              size={20}
              style={styles.headerIcon}
              icon={faLessThan}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Timetable</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ padding: 15 }}>
          <View style={{ marginTop: 30, marginLeft: 8 }}>
            <Text style={{ fontSize: 16 }}>Select Day</Text>
            <TextInput
              style={styles.input}
              value={selectedDay}
              onChangeText={setSelectedDay}
              placeholder="Enter day"
            />
          </View>

          <View style={{ marginTop: 30, marginLeft: 8 }}>
            <Text style={{ fontSize: 16 }}>Select Class</Text>
            <TextInput
              style={styles.input}
              value={selectedClass}
              onChangeText={setSelectedClass}
              placeholder="Enter class"
            />
          </View>

          <View style={{ marginTop: 30, marginLeft: 8 }}>
            <Text style={{ fontSize: 16 }}>Add Timetable Entry</Text>
            <TextInput
              style={styles.input}
              value={period}
              onChangeText={setPeriod}
              placeholder="Period"
            />
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              placeholder="Subject"
            />
            <TextInput
              style={styles.input}
              value={startTime}
              onChangeText={setStartTime}
              placeholder="Start Time"
            />
            <TextInput
              style={styles.input}
              value={endTime}
              onChangeText={setEndTime}
              placeholder="End Time"
            />
            <TextInput
              style={styles.input}
              value={teacher}
              onChangeText={setTeacher}
              placeholder="Teacher"
            />
            <TouchableOpacity onPress={addTimetableEntry}>
              <View>
                <Text style={styles.addButton}>Add Entry</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={[styles.sectionHeading, isUpdatePressed && styles.blackText]}>
              Day: {selectedDay}
            </Text>
            <Text style={[styles.sectionHeading, isUpdatePressed && styles.blackText]}>
              Class: {selectedClass}
            </Text>
            <Text style={[styles.sectionHeading, isUpdatePressed && styles.blackText]}>
              Timetable Entries:
            </Text>
            {timetableData.map((entry, index) => (
              <View key={index} style={styles.entryContainer}>
                <Text>Day: {entry.day}</Text>
                <Text>Class: {entry.class}</Text>
                <Text>Period: {entry.period}</Text>
                <Text>Subject: {entry.subject}</Text>
                <Text>Time: {entry.time}</Text>
                <Text>Teacher: {entry.teacher}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={sendTimetableData}>
            <View>
              <Text style={styles.btn}>UPDATE TIMETABLE</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={clearTimetableEntries}>
            <View>
              <Text style={styles.clearButton}>CLEAR TIMETABLE ENTRIES</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 40,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  headerIcon: {
    color: 'white',
    fontWeight: '600',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4477BB',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  btn: {
    padding: 15,
    backgroundColor: '#4477BB',
    textAlign: 'center',
    color: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: 16,
    marginLeft: 4,
    marginRight: 4,
    fontWeight: 'bold',
    marginTop: 40,
    textTransform: 'uppercase',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  entryContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  blackText: {
    color: 'black',
  },
  clearButton: {
    padding: 10,
    backgroundColor: 'red',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 5,
    marginTop: 20,
  },
});

export default TimetableScreen;
