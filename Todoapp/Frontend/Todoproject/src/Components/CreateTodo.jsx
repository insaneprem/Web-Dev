export function CreateTodo() {
  return (
    <div>
      <input
        type="text"
        placeholder="title"
        style={{ padding: 10, margin: 5 }}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="description"
        style={{ padding: 10, margin: 5 }}
      />{" "}
      <br />
      <button style={{ padding: 10, margin: 5 }}>Add a Todo</button>
    </div>
  );
}
