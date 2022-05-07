const {useState} = React;
const {Button, Container, List, ListItem, ListItemText, Box  } = MaterialUI;

const initialLeftHandListData = [
  'Liam',
  'Noah',
  'Oliver',
  'Elijah',
  'William',
  'James',
  'Benjamin',
  'Lucas',
  'Henry',
  'Alexander',
  'Mason',
  'Michael',
  'Ethan',
  'Daniel',
  'Jacob',
  'Logan',
  'Jackson',
  'Levi',
  'Sebastian',
  'Mateo',
 ];
 
 const initialLeftHandListData2 = [
  {id: 3, text: 'Elijah'},
  {id: 4, text: 'William'},
  {id: 5, text: 'James'},
  {id: 6, text: 'Benjamin'},
  {id: 7, text: 'Lucas'},
  {id: 8, text: 'Henry'},
  {id: 9, text: 'Alexander'},
  {id: 10, text: 'Mason'},
  {id: 11, text: 'Michael'},
  {id: 12, text: 'Ethan'},
  {id: 13, text: 'Daniel'},
  {id: 14, text: 'Jacob'},
  {id: 15, text: 'Logan'},
  {id: 16, text: 'Jackson'},
  {id: 17, text: 'Levi'},
  {id: 18, text: 'Sebastian'},
  {id: 19, text: 'Mateo'},
 ];

 const initialLeftHandListData3 = [
  {id: 0, text: 'Liam'},
  {id: 1, text: 'Noah'},
  {id: 2, text: 'Oliver'},
 ];
  

const Instructions = ()=>{
  return (<p>Welcome to the 3-pane coding view. We've started you off with a basic <u>React</u> project, but feel free to replace it with whatever suits your needs. You can write code separately across the panes or you can write JS and CSS inline in the <b>HTML</b> file.</p>)
}


// Component -  section toolbar
const SectionToolBar = ({list = [], setSelectionfx = () => {} }) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          width: 300,
          height: 300,
          overflow: "scroll",
        }}  
      >
        {
          //toolbar list
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {Object.keys(list).map((item, i) => (
                // loop through and array of objects
                <ListItem key={i}>
                    <ListItemText primary={list[item].text} onClick={() => setSelectionfx(list[item].text)}/>
                </ListItem>
              ))}
          </List>
        }
      </Box>
    </Container>
  )
}




const App = () => {
// State to store current available list 
const [availableList, setAvailableList] = useState(initialLeftHandListData2);
// State to store current toolbar buttons 
const [currentList, setCurrentList] = useState(initialLeftHandListData3);

// State to save selected choice 
const [selection, setSelection] = useState('');


const setCurrentSelection = (value) => {
    setSelection(value);
}



// #region Add Function
  const add = () => {
    // check to see if selection is empty
    if(selection == '') 
    return;
    // removes from available list
    const newAvailableList = availableList.filter((item) => item.text != selection)
    setAvailableList(newAvailableList);
    
    // adds to current list
    const objectSelected = availableList.filter((item) => item.text == selection);
    currentList.push(objectSelected[0]);
    setCurrentList(currentList);

    // clear out selection 
    setSelection('');
  }
// #endregion

// #region Remove Function
const remove = () => {
  // check to see if selection is empty
  if(selection == '') 
    return;
  // removes from current list
  const newCurrentList = currentList.filter((item) => item.text != selection)
  setCurrentList(newCurrentList);
  
  // adds to available list
  const objectSelected = currentList.filter((item) => item.text == selection);
  availableList.push(objectSelected[0]);
  setAvailableList(availableList);

  // clear out selection 
  setSelection('');
}
// #endregion

  return (
    <div className="App">
      <div>
      <p>Available toolbar buttons:</p>
        <SectionToolBar list={availableList} setSelectionfx={setCurrentSelection}/>
      </div>
      
      <Button onClick={() => { remove() }} variant="text">Remove ^</Button>

      <Button onClick={() => add() }variant="text">Add v</Button>
      <div>
        <p>Current Toolbar buttons:</p>
        <SectionToolBar list={currentList} setSelectionfx={setCurrentSelection}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
