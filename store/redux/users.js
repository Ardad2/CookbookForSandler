import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [ {
            id: 0,
            username: "John",
            behaviors:[

            ],
            behaviorLogs: [

            ]
        }
        ], 
    },

    reducers: {
        addUser: (state, action) => {

            var exists = false;

            for (var i = 0; i < state.users.length; i++)
            {
                if (state.users[i].username == (action.payload.username))
                {
                    exists = true;
                }
            }

            if (exists == false)
            {


                var newId = 0;

                if (state.users.length > 0)
                {

                for (var i = 0; i < state.users.length; i++)
                {
                    newId = state.users[i].id;
                }

                newId = newId + 1;
            }



            state.users.push({
                id: newId,
                username: action.payload.username,
                behaviors: [],
                behaviorLogs: [
                ]
            });

            /*state.users[newId].behaviorLogs.push({
                id: Math.random().toString(),
                name: "Go for a walk",
                icon: "TEST",
                count: 0,
                goalCount: 40,
                memo: "",
                date: "2023-11-04",
                type: "YES"
            });
            state.users[newId].behaviorLogs.push({
                id: Math.random().toString(),
                name: "Healthy eating",
                icon: "TEST",
                count: 0,
                goalCount: 30,
                memo: "",
                date: "2023-11-03",
                type: "YES"
            });
            state.users[newId].behaviorLogs.push({
                id: Math.random().toString(),
                name: "Read a book",
                icon: "TEST",
                count: 0,
                goalCount: 100,
                memo: "",
                date: "2023-11-03",
                type: "YES"
            });
            state.users[newId].behaviorLogs.push({
                id: Math.random().toString(),
                name: "Test2",
                icon: "TEST",
                count: 0,
                goalCount: 40,
                memo: "",
                date: "2023-10-29",
                type: "YES"
            });*/
        


            }


        },
        removeUser: (state, action) => {
            state.users.splice(state.users.indexOf(action.payload.id), 1);

        },

        addBehavior: (state, action) => {

            var index = 0;

            for (var i = 0; i < state.users.length ; i++)
            {                
                if (state.users[i].username == (action.payload.username)) {
                    index = i;
                }
            }

            state.users[index].behaviors.push(
                {
                    behaviorID: action.payload.behaviorID,
                    description: action.payload.description,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                    frequency: action.payload.frequency,
                    goalCount: action.payload.goalCount,
                    goalMeasurment: action.payload.goalMeasurment,
                    name: action.payload.behaviorName,
                    type: action.payload.type,
                    icon: action.payload.icon,
                }
            );

            //Date(year, month, day)

            var startDate = new Date(action.payload.startDate.substring(0,4)
                ,action.payload.startDate.substring(5,7)-1,
                action.payload.startDate.substring(8,10)
            );

            //Add the first two dates:

            var endDate = new Date(action.payload.endDate.substring(0,4)
                ,action.payload.endDate.substring(5,7)-1,
                action.payload.endDate.substring(8,10) );

                /*state.users[index].behaviorLogs.push({
                    behaviorID:action.payload.behaviorID,
                    behaviorLogID:Math.random().toString(),
                    behaviorName:action.payload.behaviorName,
                    count:action.payload.count,
                    date:action.action.payload.startDate,
                    goalCount:action.action.payload.goalCount,
                    goalMeasurment:action.payload.goalMeasurment,
                    time:action.payload.time,
                    memo:action.payload.memo,
                    icon:action.payload.icon
                });

                state.users[index].behaviorLogs.push({
                    behaviorID:action.payload.behaviorID,
                    behaviorLogID:Math.random().toString(),
                    behaviorName:action.payload.behaviorName,
                    count:action.payload.count,
                    date:action.action.payload.endDate,
                    goalCount:action.action.payload.goalCount,
                    goalMeasurment:action.payload.goalMeasurment,
                    time:action.payload.time,
                    memo:action.payload.memo,
                    icon:action.payload.icon
                });
                */

                let currentDate = new Date(action.payload.startDate.substring(0,4)
                ,action.payload.startDate.substring(5,7)-1,
                action.payload.startDate.substring(8,10)
            );
                console.log(startDate.toDateString());
                console.log(currentDate.toDateString());
                console.log(endDate.toDateString());

                const addDays = function (days) {
                    const date = new Date(this.valueOf())
                    date.setDate(date.getDate() + days)
                    return date
                  }

                while (currentDate <= endDate)
                {
                    var year = currentDate.toLocaleString("default", { year: "numeric" });
                    var month = currentDate.toLocaleString("default", { month: "2-digit" });
                    var day = currentDate.toLocaleString("default", { day: "2-digit" });
                    var formattedDate = year + "-" + month + "-" + day;
                    console.log(formattedDate);
                   
                    //console.log(currentDate.toDateString());

                    state.users[index].behaviorLogs.push({
                        behaviorID:action.payload.behaviorID,
                        behaviorLogID:Math.random().toString(),
                        behaviorName:action.payload.behaviorName,
                        count:action.payload.count,
                        date:formattedDate,
                        goalCount:action.payload.goalCount,
                        goalMeasurment:action.payload.goalMeasurment,
                        time:"",
                        memo:"",
                        icon:action.payload.icon
                    });
                    //console.log(currentDate.toDateString());

                    currentDate = addDays.call(currentDate, 1);

                    console.log("Added 1!");
                }



        },
        
        incrementBehavior: (state, action) => {
            

            var index = 0;
            var behaviorIndex = -1;

            for (var i = 0; i < state.users.length ; i++)
            {                
                if (state.users[i].username == (action.payload.username)) {
                    console.log("Found the user!");
                    index = i;
                }
            }

            console.log("To find: " + action.payload.behaviorName);

            for (var i = 0; i < state.users[index].behaviorLogs.length ; i++)
            {                
               // console.log("Current behavior iterated " + i + " -> " + state.users[index].behaviorLogs[i].name);
                if (state.users[index].behaviorLogs[i].behaviorName == (action.payload.behaviorName) && state.users[index].behaviorLogs[i].date == (action.payload.date)) {
                    console.log("Found the behavior!");
                    behaviorIndex = i;
                }
                else {
                 //   console.log(action.payload.behaviorName +"!=" )
                }
            }
            console.log(i);

            if (behaviorIndex != -1)
            {
            console.log("Initial count: " + state.users[index].behaviorLogs[behaviorIndex].count);

            state.users[index].behaviorLogs[behaviorIndex].count++;

            console.log("New count: " + state.users[index].behaviorLogs[behaviorIndex].count);
            }


        },

        decrementBehavior: (state, action) => {
            

            var index = 0;
            var behaviorIndex = 0;

            for (var i = 0; i < state.users.length ; i++)
            {                
                if (state.users[i].username == (action.payload.username)) {
                    index = i;
                }
            }

            console.log("To find behavior: " + action.payload.behaviorName);

            for (var i = 0; i < state.users[index].behaviorLogs.length ; i++)
            {                
                if (state.users[index].behaviorLogs[i].name == (action.payload.behaviorName)) {
                    behaviorIndex = i;
                }
            }


            if (state.users[index].behaviorLogs[behaviorIndex].count > 0)
            {
            state.users[index].behaviorLogs[behaviorIndex].count--;
            }


        },
    }
});

export const addUser = usersSlice.actions.addUser;
export const removeUser = usersSlice.actions.removeUser;
export const addUserBehavior = usersSlice.actions.addBehavior;
export const incrementBehavior = usersSlice.actions.incrementBehavior;
export const decrementBehavior = usersSlice.actions.decrementBehavior;


export default usersSlice.reducer;

