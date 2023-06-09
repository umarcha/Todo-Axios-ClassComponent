import React from "react";
import axios from "axios";

interface Todo {
  _id: string;
  title: string;
  status: boolean;
}

interface TodoCardProps {
  item: Todo;
  newData: (data: Todo[]) => void;
}

class TodoCard extends React.Component<TodoCardProps> {
  updateStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { item } = this.props;
    const status = e.target.checked;
    axios
      .patch(`https://todo-backend.cyclic.app/update/${item._id}`, { status: status })
      .then(() => {
        this.updateData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = () => {
    const { item } = this.props;
    axios
      .delete(`https://todo-backend.cyclic.app/delete/${item._id}`)
      .then(() => {
        this.updateData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateData = () => {
    axios
      .get("https://todo-backend.cyclic.app/get-todo")
      .then((response) => {
        const data = response.data?.todos;
        this.props.newData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { item } = this.props;
    return (
      <div className="px-4 py-6 rounded-md bg-white shadow-md">
        <div className="flex gap-3 justify-between items-center">
          <h5 className={`${item.status && "line-through text-gray-400"}`}>{item.title}</h5>
          <input type="checkbox" checked={item.status} onChange={this.updateStatus} />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={this.handleDelete}
            className="bg-red-600 rounded-md px-3 py-2 text-xs text-white"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default TodoCard;
