import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Picker } from "@react-native-picker/picker";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Tasks() {
  const navigation = useNavigation();

  // Your other code...

  const goToProjectPage = () => {
    // Navigate to the project page when the box is clicked
    navigation.navigate("Projects"); // Replace 'ProjectPage' with the actual name of your project page screen
  };
  const [proposed, setProposed] = React.useState([]); // State to manage tasks
  const [inProgress, setInProgress] = React.useState([]); // State to manage tasks
  const [review, setReview] = React.useState([]); // State to manage tasks
  const [complete, setComplete] = React.useState([]); // State to manage tasks
  const [totalTasks, setTotalTasks] = React.useState([]); // State to manage tasks
  let fetchTasks = async () => {
    try {
      const tasks = await AsyncStorage.getItem("tasks");
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };
  React.useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks()
      .then((data) => {
        setProposed(data.filter((task) => task.status === "Proposed"));
        setInProgress(data.filter((task) => task.status === "In Progress"));
        setReview(data.filter((task) => task.status === "Review"));
        setComplete(data.filter((task) => task.status === "Complete"));
        setTotalTasks(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ScrollView
      style={{
        padding: 20,
        paddingVertical: 40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#1E1E1E",
          }}
        >
          Tasker
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            gap: 10,
          }}
        >
          <MaterialCommunityIcons name="text-search" color="grey" size={26} />
          <MaterialCommunityIcons name="bell-outline" color="grey" size={26} />

          <Image
            source={{
              uri: "https://thumb.tvonenews.com/images/2022/10/04/633bb26f026ba-anime-naruto.jpg",
            }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 50,
              overflow: "hidden",
            }}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name="clock-time-eight-outline"
              color="orange"
              size={26}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              {totalTasks.length}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Pending Tasks
          </Text>
        </View>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name="folder-multiple-outline"
              color="green"
              size={26}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              {totalTasks.length}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Active Projects
          </Text>
        </View>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name="note-multiple-outline"
              color="red"
              size={26}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              {totalTasks.length}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Total Tasks
          </Text>
        </View>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name="account-supervisor-outline"
              color="skyblue"
              size={26}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              {totalTasks.length}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Teams
          </Text>
        </View>
      </View>
      <View style={styles.containerTaskStatus}>
        <View style={styles.boxTaskStatus}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name="label" color="orange" size={26} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Proposed
            </Text>
          </View>
          <TouchableOpacity onPress={goToProjectPage}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "grey",
                }}
              >
                {proposed.length} Tasks
              </Text>
              <MaterialCommunityIcons
                name="menu-right"
                color="grey"
                size={26}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxTaskStatus}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name="label" color="green" size={26} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              In Progress
            </Text>
          </View>
          <TouchableOpacity onPress={goToProjectPage}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "grey",
                }}
              >
                {inProgress.length} Tasks
              </Text>
              <MaterialCommunityIcons
                name="menu-right"
                color="grey"
                size={26}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxTaskStatus}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name="label" color="red" size={26} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Review
            </Text>
          </View>
          <TouchableOpacity onPress={goToProjectPage}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "grey",
                }}
              >
                {review.length} Tasks
              </Text>
              <MaterialCommunityIcons
                name="menu-right"
                color="grey"
                size={26}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxTaskStatus}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name="label" color="skyblue" size={26} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Completed
            </Text>
          </View>
          <TouchableOpacity onPress={goToProjectPage}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "grey",
                }}
              >
                {complete.length} Tasks
              </Text>
              <MaterialCommunityIcons
                name="menu-right"
                color="grey"
                size={26}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
function Projects() {
  const [tasks, setTasks] = React.useState([]); // State to manage tasks
  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const [newTaskSubtitle, setNewTaskSubtitle] = React.useState("");
  const [newTaskDate, setNewTaskDate] = React.useState("");
  const [newTaskPriority, setNewTaskPriority] = React.useState("Medium");
  const [showTaskForm, setShowTaskForm] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("All"); // State for selected task status

  React.useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  // Fetch tasks from AsyncStorage
  const fetchTasks = async () => {
    try {
      const tasks = await AsyncStorage.getItem("tasks");
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
      throw error;
    }
  };

  const editTaskStatus = (taskId, newStatus) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (taskToUpdate) {
      taskToUpdate.status = newStatus;

      const updatedTasks = tasks.map((task) =>
        task.id === taskToUpdate.id ? taskToUpdate : task
      );

      saveTasks(updatedTasks);
      setTasks(updatedTasks);
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      subtitle: newTaskSubtitle,
      date: newTaskDate,
      priority: newTaskPriority,
      status: "Proposed", // Default status
      subtasks: [],
    };

    const updatedTasks = [...tasks, newTask];

    saveTasks(updatedTasks);
    setNewTaskTitle("");
    setNewTaskSubtitle("");
    setNewTaskDate("");
    setNewTaskPriority("Medium");
    setTasks(updatedTasks);
    setModalVisible(false);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const filterTasksByStatus = (status) => {
    setSelectedStatus(status);
  };

  const filteredTasks =
    selectedStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === selectedStatus);

  return (
    <ScrollView
      style={{
        padding: 20,
        paddingVertical: 40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#1E1E1E",
          }}
        >
          Tasker
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            gap: 10,
          }}
        >
          <MaterialCommunityIcons name="text-search" color="grey" size={26} />
          <MaterialCommunityIcons name="bell-outline" color="grey" size={26} />

          <Image
            source={{
              uri: "https://thumb.tvonenews.com/images/2022/10/04/633bb26f026ba-anime-naruto.jpg",
            }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 50,
              overflow: "hidden",
            }}
          />
        </View>
      </View>

      {/* Buttons to filter tasks by status */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => filterTasksByStatus("All")}
          style={
            selectedStatus === "All" ? styles.selectedButton : styles.button
          }
        >
          <Text style={{ color: "white" }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterTasksByStatus("Proposed")}
          style={
            selectedStatus === "Proposed"
              ? styles.selectedButton
              : styles.button
          }
        >
          <Text style={{ color: "white" }}>Proposed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterTasksByStatus("In Progress")}
          style={
            selectedStatus === "In Progress"
              ? styles.selectedButton
              : styles.button
          }
        >
          {/* <View
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
          > */}

          <Text style={{ color: "white" }}>In Progress</Text>
          {/* </View> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterTasksByStatus("Review")}
          style={
            selectedStatus === "Review" ? styles.selectedButton : styles.button
          }
        >
          <Text style={{ color: "white" }}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterTasksByStatus("Complete")}
          style={
            selectedStatus === "Complete"
              ? styles.selectedButton
              : styles.button
          }
        >
          <Text style={{ color: "white" }}>Complete</Text>
        </TouchableOpacity>
      </View>

      {/* Button to show/hide task form */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: "skyblue",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Add Task</Text>
        <MaterialCommunityIcons
          name="plus-circle-outline"
          color="white"
          size={26}
        />
      </TouchableOpacity>

      {/* Task form */}
      <Modal
        animationType="slide"
        height={200}
        width={200}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
            Add Task
          </Text>
          <TextInput
            placeholder="New Task"
            value={newTaskTitle}
            onChangeText={(text) => setNewTaskTitle(text)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              width: 200,
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Subtitle"
            value={newTaskSubtitle}
            onChangeText={(text) => setNewTaskSubtitle(text)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              width: 200,
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Date"
            value={newTaskDate}
            onChangeText={(text) => setNewTaskDate(text)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              width: 200,
              marginBottom: 10,
            }}
          />
          <Picker
            selectedValue={newTaskPriority}
            style={{
              height: 50,
              width: 200,
              marginBottom: 10,
            }}
            onValueChange={(itemValue) => setNewTaskPriority(itemValue)}
          >
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Urgent" value="Urgent" />
          </Picker>
          <TouchableOpacity
            onPress={addTask}
            style={{
              backgroundColor: "skyblue",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              backgroundColor: "lightgrey",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.container}>
        {filteredTasks.map((task) => (
          <View key={task.id} style={styles.filteredTaskBox}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    fontWeight: "700",
                    color: "black",
                    paddingVertical: 5,

                  }}
                >
                  {task.title}
                </Text>
                <Text
  style={{
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "400",
    color: "grey",
    backgroundColor: (() => {
      switch (task.priority) {
        case 'Low':
          return 'lightgreen';
        case 'Medium':
          return 'orange';
        case 'Urgent':
          return 'red';
        default:
          return 'transparent'; // Default background color
      }
    })(),
    borderRadius: 5,
    padding: 5,
  }}
>
  {task.priority}
</Text>

              </View>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 5,
                  fontWeight: "400",
                  color: "grey",
                }}
              >
                {task.subtitle}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 5,
                  fontWeight: "400",
                  color: "grey",
                }}
              >
                Date: {task.date}
              </Text>
              <Picker
                selectedValue={task.status}
                style={{ height: 40, width: 150 }}
                onValueChange={(itemValue) =>
                  editTaskStatus(task.id, itemValue)
                }
              >
                <Picker.Item label="Proposed" value="Proposed" />
                <Picker.Item label="In Progress" value="In Progress" />
                <Picker.Item label="Review" value="Review" />
                <Picker.Item label="Complete" value="Complete" />
              </Picker>
            </View>

            <TouchableOpacity onPress={() => deleteTask(task.id)}>
              <MaterialCommunityIcons name="delete" color="red" size={26} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Account() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Account!</Text>
    </View>
  );
}
function Team() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Team!</Text>
    </View>
  );
}

function Chats() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chats!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Tasks"
      activeColor="black"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: "skyblue" }}
    >
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarLabel: "Projects",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="briefcase-edit"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-processing"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Team"
        component={Team}
        options={{
          tabBarLabel: "Team",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-supervisor"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 16,
  },
  box: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    padding: 16,
    alignItems: "start",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  filteredTaskBox: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    padding: 16,
    alignItems: "start",
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerTaskStatus: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 80,
  },
  boxTaskStatus: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "lightgrey",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "skyblue",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
});
