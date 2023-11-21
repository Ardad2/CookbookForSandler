import {useState, useEffect, useRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useSelector, dispatch, useDispatch } from 'react-redux';

import { 
  StyleSheet,  
  View, 
  FlatList, Button, Text, 
  ScrollView, TouchableOpacity, TouchableWithoutFeedback, Modal, Platform, ActivityIndicator, Pressable
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';
import DateTimePicker from '@react-native-community/datetimepicker';


import BehaviorItem from '../../components/BehaviorItem';
import BehaviorInput from '../../components/BehaviorInput';
import IconButton from '../../components/IconButton';

import BehaviorDetailScreen from './BehaviorDetailScreen';
import BehaviorFormScreen from './BehaviorFormScreen';

import WeeklyCalendar  from '../../components/Calendar/WeeklyCalendar';


import { authenticateAuthTokens, logoutAuthTokens } from '../../store/redux/authTokens';


const HomeStack = createStackNavigator();

export default function AltHomeScreen({navigation}) {

//  const behaviorList = useSelector((state) => state.behaviors.behaviors);
const dispatch = useDispatch();

const authToken = useSelector( (state) => state.authTokens.data[0]); 

//const behaviorList = useSelector( (state) => state.users.users[0].behaviors);

const userList = useSelector( (state) => state.users.users);
const currUser = userList.filter(user => user.username == authToken.email);
const behaviorList = currUser[0].behaviorLogs;

/* Below are examples for calendar behaviors which are not based off of actual user info. 
Once the database is connected, the behavior information will be based off of the user's info */


  const [ date, setDate ] = useState(null);
  const [currDate, setCurrDate] = useState(moment(moment()).locale(en))
  const [weekdays, setWeekdays] = useState([])
  const [weekdayLabels, setWeekdayLabels] = useState([])
  const [selectedDate, setSelectedDate] = useState(currDate.clone())
  const [isCalendarReady, setCalendarReady] = useState(false)
  const [pickerDate, setPickerDate] = useState(currDate.clone())
  const [isPickerVisible, setPickerVisible] = useState(false)
  const [cancelText, setCancelText] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [eventMap, setEventMap] = useState(undefined)
  const [scheduleView, setScheduleView] = useState(undefined)
  const [dayViewOffsets, setDayViewOffsets] = useState(undefined)
  const scrollViewRef = useRef()

  useEffect( () => {
    let today = new Date();
    let date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
    setDate(date);
    setCancelText('Cancel');
    setConfirmText('Confirm');
    createEventMap(currUser[0].behaviorLogs)
    setCalendarReady(true)
  }, []);

  const createEventMap = events => {
    let dateMap = new Map()

    for (let i = 0; i < events.length; i++) {
        let eventDate = moment(events[i].date).format('YYYY-MM-DD').toString()
        if (dateMap.has(eventDate)) {
            let eventArr = dateMap.get(eventDate)
            eventArr.push(events[i])
            dateMap.set(eventDate, eventArr) 
        } else {
            dateMap.set(eventDate, [events[i]])
        }
    }
    setEventMap(dateMap)
    createWeekdays(currDate, dateMap)
}

const createWeekdays = (date, map) => {
  let dayViews = []
  let offsets = []
  setWeekdays([])
  for (let i = 0; i < 7; i++) {
      const weekdayToAdd = date.clone().weekday(7 - 7 + i)
      setWeekdays(weekdays => [...weekdays, weekdayToAdd])
      setWeekdayLabels(weekdayLabels => [...weekdayLabels, weekdayToAdd.format('ddd')])

      // render schedule view
      let events = map.get(weekdayToAdd.format('YYYY-MM-DD').toString())
      let eventViews = []
      if (events !== undefined) {
          if(props.renderEvent !== undefined) {
              eventViews = events.map((event, j) => {
                  if(props.renderFirstEvent !== undefined && j === 0) return props.renderFirstEvent(event, j)
                  else if(props.renderLastEvent !== undefined && j === events.length - 1) return props.renderLastEvent(event, j)
                  else return props.renderEvent(event, j)
              })
          } else {
              eventViews = events.map((event, j) => {
                  return (
                      <View key={i + "-" + j}>
                  <BehaviorItem 

                  id = {event.id}
                  name = {event.name}
                  icon={event.icon}
                  count={event.count}
                  goalCount={event.goalCount}
                  memo={event.memo}
                  date={event.date}
                  type={event.type}
                  onPress={pressHandler}
                  />
                      </View>
                  )
              })
          }
      }
      
      
      let dayView = undefined
      if (props.renderDay !== undefined) {
          if (props.renderFirstDay !== undefined && i === 0) dayView = props.renderFirstDay(eventViews, weekdayToAdd, i)
          else if (props.renderLastDay !== undefined && i === 6) dayView = props.renderLastDay(eventViews, weekdayToAdd, i)
          else dayView = props.renderDay(eventViews, weekdayToAdd, i)
      } else {
          dayView = (
              <View key={i.toString()} style={styles.day} onLayout= {event => { offsets[i] = event.nativeEvent.layout.y }}>
                  <View style={styles.dayLabel}>
                      <Text style={[styles.monthDateText, { color: props.themeColor }]}>{weekdayToAdd.format('M/D').toString()}</Text>
                      <Text style={[styles.dayText, { color: props.themeColor }]}>{weekdayToAdd.format('ddd').toString()}</Text>
                  </View>
                  <View style={[styles.allEvents, eventViews.length === 0 ? { width: '100%', backgroundColor: 'lightgrey' } : {}]}>
                  <Pressable 
                      android_ripple ={{color:'#210644'}}
                      > 
                      {eventViews}
                      </Pressable>


                  </View>
              </View>
          )
      }
      dayViews.push(dayView)
  }
  setScheduleView(dayViews)
  setDayViewOffsets(offsets)
}

const clickLastWeekHandler = () => {
  setCalendarReady(false)
  const lastWeekCurrDate = currDate.subtract(7, 'days')
  setCurrDate(lastWeekCurrDate.clone())
  setSelectedDate(lastWeekCurrDate.clone().weekday(7 - 7))
  createWeekdays(lastWeekCurrDate.clone(), eventMap)
  setCalendarReady(true)
}

const clickNextWeekHandler = () => {
  setCalendarReady(false)
  const nextWeekCurrDate = currDate.add(7, 'days')
  setCurrDate(nextWeekCurrDate.clone())
  setSelectedDate(nextWeekCurrDate.clone().weekday(7 - 7))
  createWeekdays(nextWeekCurrDate.clone(), eventMap)
  setCalendarReady(true)
}
const isSelectedDate = date => {
  return (selectedDate.year() === date.year() && selectedDate.month() === date.month() && selectedDate.date() === date.date())
}

const pickerOnChange = (_event, pickedDate) => {
  if (Platform.OS === 'android') {
      setPickerVisible(false)
      setLoading(true)
      if (pickedDate !== undefined) { // when confirm pressed
          setTimeout( () => {
              let pickedDateMoment = moment(pickedDate).locale(props.locale)
              setPickerDate(pickedDateMoment)
              confirmPickerHandler(pickedDateMoment)
              setLoading(false)
          }, 0)
      } else setLoading(false)
  }
  else setPickerDate(moment(pickedDate).locale(props.locale))
}

const confirmPickerHandler = pickedDate => {
  setCurrDate(pickedDate)
  setSelectedDate(pickedDate)

  setCalendarReady(false)
  createWeekdays(pickedDate, eventMap)
  setCalendarReady(true)

  setPickerVisible(false)
}

const onDayPress = (weekday, i) => {
  scrollViewRef.current.scrollTo({ y: dayViewOffsets[i], animated: true })
  setSelectedDate(weekday.clone())
  if (props.onDayPress !== undefined) props.onDayPress(weekday.clone(), i)
}


  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseBehaviors, setCourseBehaviors] = useState([]);

  function startAddBehaviorHandler() {
   //setModalIsVisible(true);
   navigation.navigate("BehaviorListScreen")

  // navigation.navigate("BehaviorFormScreen", { onAddBehavior: addBehaviorHandler} )

  }

  function endAddBehaviorHandler() {
   // setModalIsVisible(false);
   
  }
  
  function addBehaviorHandler(enteredBehaviorText) {
    setCourseBehaviors(currentCourseBehaviors => [...currentCourseBehaviors, {text: enteredBehaviorText, id: Math.random().toString(), date: date, icon: "Hello"}       ]);
  endAddBehaviorHandler();
  }

  function deleteBehaviorHandler(id) {
    setCourseBehaviors( (currentCourseBehaviors) => {
      return currentCourseBehaviors.filter((behavior) => behavior.id != id);
    } );
  }

  


  function pressHandler(name) {
    navigation.navigate("BehaviorDetailScreen", { name: name});
  }

  return (
    /*
    <>
    <StatusBar style="light"/>
    <View style={styles.appContainer}>
    <BehaviorInput
     visible={modalIsVisible} 
     onAddBehavior={addBehaviorHandler} 
     onCancel={endAddBehaviorHandler}
     />
     <View> 
       <Text style={styles.headingText}>Welcome back {authToken.email} What did you do today?</Text>
     </View>

     <View style={styles.plusButton}>  
    <IconButton icon="add-circle-outline" color="black" onPress={startAddBehaviorHandler} />
    </View>  
    
      <View style={styles.behaviorsContainer}>
        <FlatList data={behaviorList} renderItem = {itemData => {
          return <BehaviorItem 

          id = {itemData.item.id}
          name = {itemData.item.name}
          icon={itemData.item.icon}
          count={itemData.item.count}
          goalCount={itemData.item.goalCount}
          memo={itemData.item.memo}
          date={itemData.item.date}
          type={itemData.item.type}


          onDeleteItem={deleteBehaviorHandler}
          onPress={pressHandler}
          />
z
        }}
        keyExtractor={(item,index) => {return item.id}} 
        alwaysBounceVertical={true}
        /> 
        </View>
      </View>
        </>
  );


*/ 
<>
<View> 
       <Text style={styles.headingText}>Welcome back {authToken.email} What did you do today?</Text>
     </View>
     <View style={styles.plusButton}>  
    <IconButton icon="add-circle-outline" color="black" onPress={startAddBehaviorHandler} />
    </View>  

    <View style={[styles.component, props.style]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowButton} onPress={clickLastWeekHandler}>
                    <Text style={{ color: props.themeColor }}>{'\u25C0'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPickerVisible(true)}>
                    <Text style={[styles.title, props.titleStyle]}>{isCalendarReady}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowButton} onPress={clickNextWeekHandler}>
                    <Text style={{ color: props.themeColor }}>{'\u25B6'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.week}>
                <View style={styles.weekdayLabelContainer}>
                    <View style={styles.weekdayLabel}>
                        <Text style={[styles.weekdayLabelText, props.dayLabelStyle]}>{weekdays.length > 0 ? weekdayLabels[0] : ''}</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={[styles.weekdayLabelText, props.dayLabelStyle]}>{weekdays.length > 0 ? weekdayLabels[1] : ''}</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={[styles.weekdayLabelText, props.dayLabelStyle]}>{weekdays.length > 0 ? weekdayLabels[2] : ''}</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={[styles.weekdayLabelText, props.dayLabelStyle]}>{weekdays.length > 0 ? weekdayLabels[3] : ''}</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={[styles.weekdayLabelText, props.dayLabelStyle]}>{weekdays.length > 0 ? weekdayLabels[4] : ''}</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={[styles.weekdayLabelText, props.dayLabelStyle]}>{weekdays.length > 0 ? weekdayLabels[5] : ''}</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={[styles.weekdayLabelText, props.dayLabelStyle]}>{weekdays.length > 0 ? weekdayLabels[6] : ''}</Text>
                    </View>
                </View>
                <View style={styles.weekdayNumberContainer}>
                    <TouchableOpacity style={styles.weekDayNumber} onPress={onDayPress.bind(this, weekdays[0], 0)}>
                        <View style={isCalendarReady && isSelectedDate(weekdays[0]) ? [styles.weekDayNumberCircle, { backgroundColor: props.themeColor }] : { } }>
                            <Text style={isCalendarReady && isSelectedDate(weekdays[0]) ? styles.weekDayNumberTextToday : { color: props.themeColor }}>
                                {isCalendarReady ? weekdays[0].date() : ''}
                            </Text>
                        </View>
                        {isCalendarReady && eventMap.get(weekdays[0].format('YYYY-MM-DD').toString()) !== undefined && 
                            <View style={isSelectedDate(weekdays[0]) ? [styles.dot, { backgroundColor: 'white' }] : [styles.dot, { backgroundColor: props.themeColor }]} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber} onPress={onDayPress.bind(this, weekdays[1], 1)}>
                        <View style={isCalendarReady && isSelectedDate(weekdays[1]) ? [styles.weekDayNumberCircle, { backgroundColor: props.themeColor }] : { } }>
                            <Text style={isCalendarReady && isSelectedDate(weekdays[1]) ? styles.weekDayNumberTextToday : { color: props.themeColor }}>
                                {isCalendarReady ? weekdays[1].date() : ''}
                            </Text>
                        </View>
                        {isCalendarReady && eventMap.get(weekdays[1].format('YYYY-MM-DD').toString()) !== undefined && 
                            <View style={isSelectedDate(weekdays[1]) ? [styles.dot, { backgroundColor: 'white' }] : [styles.dot, { backgroundColor: props.themeColor }]} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber} onPress={onDayPress.bind(this, weekdays[2], 2)}>
                        <View style={isCalendarReady && isSelectedDate(weekdays[2]) ? [styles.weekDayNumberCircle, { backgroundColor: props.themeColor }] : { } }>
                            <Text style={isCalendarReady && isSelectedDate(weekdays[2]) ? styles.weekDayNumberTextToday : { color: props.themeColor }}>
                                {isCalendarReady ? weekdays[2].date() : ''}
                            </Text>
                        </View>
                        {isCalendarReady && eventMap.get(weekdays[2].format('YYYY-MM-DD').toString()) !== undefined && 
                            <View style={isSelectedDate(weekdays[2]) ? [styles.dot, { backgroundColor: 'white' }] : [styles.dot, { backgroundColor: props.themeColor }]} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber} onPress={onDayPress.bind(this, weekdays[3], 3)}>
                        <View style={isCalendarReady && isSelectedDate(weekdays[3]) ? [styles.weekDayNumberCircle, { backgroundColor: props.themeColor }] : { } }>
                            <Text style={isCalendarReady && isSelectedDate(weekdays[3]) ? styles.weekDayNumberTextToday : { color: props.themeColor }}>
                                {isCalendarReady ? weekdays[3].date() : ''}
                            </Text>
                        </View>
                        {isCalendarReady && eventMap.get(weekdays[3].format('YYYY-MM-DD').toString()) !== undefined && 
                            <View style={isSelectedDate(weekdays[3]) ? [styles.dot, { backgroundColor: 'white' }] : [styles.dot, { backgroundColor: props.themeColor }]} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber} onPress={onDayPress.bind(this, weekdays[4], 4)}>
                        <View style={isCalendarReady && isSelectedDate(weekdays[4]) ? [styles.weekDayNumberCircle, { backgroundColor: props.themeColor }] : { } }>
                            <Text style={isCalendarReady && isSelectedDate(weekdays[4]) ? styles.weekDayNumberTextToday : { color: props.themeColor }}>
                                {isCalendarReady ? weekdays[4].date() : ''}
                            </Text>
                        </View>
                        {isCalendarReady && eventMap.get(weekdays[4].format('YYYY-MM-DD').toString()) !== undefined && 
                            <View style={isSelectedDate(weekdays[4]) ? [styles.dot, { backgroundColor: 'white' }] : [styles.dot, { backgroundColor: props.themeColor }]} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber} onPress={onDayPress.bind(this, weekdays[5], 5)}>
                        <View style={isCalendarReady && isSelectedDate(weekdays[5]) ? [styles.weekDayNumberCircle, { backgroundColor: props.themeColor }] : { } }>
                            <Text style={isCalendarReady && isSelectedDate(weekdays[5]) ? styles.weekDayNumberTextToday : { color: props.themeColor }}>
                                {isCalendarReady ? weekdays[5].date() : ''}
                            </Text>
                        </View>
                        {isCalendarReady && eventMap.get(weekdays[5].format('YYYY-MM-DD').toString()) !== undefined && 
                            <View style={isSelectedDate(weekdays[5]) ? [styles.dot, { backgroundColor: 'white' }] : [styles.dot, { backgroundColor: props.themeColor }]} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber} onPress={onDayPress.bind(this, weekdays[6], 6)}>
                        <View style={isCalendarReady && isSelectedDate(weekdays[6]) ? [styles.weekDayNumberCircle, { backgroundColor: props.themeColor }] : { } }>
                            <Text style={isCalendarReady && isSelectedDate(weekdays[6]) ? styles.weekDayNumberTextToday : { color: props.themeColor }}>
                                {isCalendarReady ? weekdays[6].date() : ''}
                            </Text>
                        </View>
                        {isCalendarReady && eventMap.get(weekdays[6].format('YYYY-MM-DD').toString()) !== undefined && 
                            <View style={isSelectedDate(weekdays[6]) ? [styles.dot, { backgroundColor: 'white' }] : [styles.dot, { backgroundColor: props.themeColor }]} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView ref={scrollViewRef} style={styles.schedule}>
                {(scheduleView !== undefined) && scheduleView}
            </ScrollView>
            {Platform.OS === 'ios' && <Modal
                transparent={true}
                animationType='fade'
                visible={isPickerVisible}
                onRequestClose={() => setPickerVisible(false)} // for android only
                style={styles.modal}
            >
                <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
                    <View style={styles.blurredArea} />
                </TouchableWithoutFeedback>
                <View style={styles.pickerButtons}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setPickerVisible(false)}>
                        <Text style={styles.modalButtonText}>{cancelText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={confirmPickerHandler.bind(this, pickerDate)}>
                        <Text style={styles.modalButtonText}>{confirmText}</Text>
                    </TouchableOpacity>
                </View>
                <DateTimePicker
                    locale={props.locale}
                    value={pickerDate.toDate()}
                    onChange={pickerOnChange}
                    style={styles.picker}
                />
            </Modal> }
            {Platform.OS === 'android' && isPickerVisible && <DateTimePicker
                locale={props.locale}
                value={pickerDate.toDate()}
                display='spinner'
                onChange={pickerOnChange}
            /> }
            {(!isCalendarReady || isLoading) && <ActivityIndicator size='large' color='grey' style={styles.indicator} />}
        </View>


</>

  );

  

}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA'
    //You can add a "backgroundColor" in app.json.
  },
  behaviorsContainer: {
    flex: 5
  },
  headingText: {
    fontSize: 20,
    color: 'black'
  },
  plusButton: {
    alignItems: 'center'
  },
});
