import React from "react";
import AddTodo from "./components/AddTodo";
import TodoCard from "./components/TodoCard";
import axios from "axios";

export interface Todo {
  _id: string;
  title: string;
  status: boolean;
}

interface AppState {
  data: Todo[];
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://todo-backend.cyclic.app/get-todo")
      .then((response) => {
        this.setState({ data: response.data?.todos });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleNewData = (data: Todo[]) => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <main className="max-w-4xl mx-auto px-5">
        <AddTodo newData={this.handleNewData} />
        <div className="grid grid-cols-2 gap-4 mt-12">
          {data.map((item, index) => (
            <TodoCard key={index} item={item} newData={this.handleNewData} />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
