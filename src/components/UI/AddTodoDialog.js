import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddTodoDialog({setTodos}) {
  const [open, setOpen] = React.useState(false);
  const [newTodo, setNewTodo] = React.useState("");

  //Functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWrite = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = async () => {
    //Todo eklemek apide sadece simule edilmiş gerçek todo listesine kaydetmiyor.
    //Bundan dolayı her gönderilen yeni todo ekleme isteği aynı id ile kayıt oluyor ve farklı id'lerle göndermediğimiz için map fonksiyonunun key değeri hata veriyor.
    //Bu hata tamamen api'nin todo ekleme ekranınının sadece simule edilmiş olmasından kaynaklıdır.
    //Ve sayfayı yenilediğimizde eklediğimiz todoların kaybolması da tamamen api'nin todolarımızı sunucuya eklememesinden kaynaklıdır.
    fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: newTodo,
        completed: false,
        userId: 3,
      }),
    })
    .then((res) => res.json())
    .then((data) => setTodos(prev => [...prev , data]) );

    setNewTodo("")
    handleClose()
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        + Add New Todo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add New Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can write what you want to add to your to-do list in the field
            below.
          </DialogContentText>
          <TextField
            onChange={(e) => handleWrite(e)}
            autoFocus
            required
            margin="dense"
            id="todo"
            name="todo"
            label="Todo"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTodo}>+ Add Todo</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
