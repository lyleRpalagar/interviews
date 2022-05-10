const {useState, useEffect} = React;
const {Button, Container, List, ListItem, ListItemText, Box, Alert, useMediaQuery } = MaterialUI;

 const initialLeftHandListData = [
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

 const initialRightHandListData = [
  {id: 0, text: 'Liam'},
  {id: 1, text: 'Noah'},
  {id: 2, text: 'Oliver'},
 ];
  

// Component -  section toolbar
const SectionToolBar = ({list = [], setSelectionfx = () => {} }) => {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleSelection = (index) => {
    setSelectedIndex(index);
  }

  return (
    <Container maxWidth="sm">
      <Box className="toolbar-list">
        {
          //toolbar list
          <List>
              {Object.keys(list).map((item, i) => (
                // loop through and array of objects
                <ListItem selected={selectedIndex === i} key={i} onClick={() => {
                    setSelectionfx(list[item]);
                    handleSelection(i);
                  }
                }>
                    <ListItemText primary={list[item].text}/>
                </ListItem>
              ))}
          </List>
        }
      </Box>
    </Container>
  )
}




const App = () => {
const matches = useMediaQuery('(min-width:780px)');

// States for lists
const [availableList, setAvailableList] = useState(initialLeftHandListData);
const [currentList, setCurrentList] = useState(initialRightHandListData);

// States for selected choice
const [selection, setSelection] = useState();

// States for ui feedback
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setError(false);
    setSuccess(false);
  }, 5000);
  return () => clearTimeout(timer);
}, []);

const setCurrentSelection = (value) => {
    setSelection(value);
}

const handleClearStatus = (type) => {
  if(type === 'error') setError(false);
  if(type === 'ok') setSuccess(false);
}

const add_or_remove = (fromList, addToList, removeFromFx, addToFx) => {  
  if(selection === null || fromList.filter(i => i.id === selection.id).length === 0) {
    return setError(true);
  }  

  const newFromList = fromList.filter(i => i.id != selection.id);
  removeFromFx(newFromList);

  const objectSelected = fromList.filter(i => i.id === selection.id);
  addToList.push(objectSelected[0]);
  addToFx(addToList);

  setSelection('');
  return setSuccess(true);
}


  return (
    <div className="App">      
      {error && <Alert onClose={() => handleClearStatus('error')} severity="error"> Sorry — <strong>Action was not process, please try again</strong></Alert>}
      {success && <Alert onClose={() => handleClearStatus('ok')} severity="success">Success — <strong>your list has been updated check it out!</strong></Alert>}
      <Box className="toolbar-wrapper">
        <div>
          <h2 className="toolbar-title">Available toolbar buttons:</h2>
          <SectionToolBar list={availableList} setSelectionfx={setCurrentSelection}/>
        </div>
        
        <Box className="button-wrapper" sx={{ '& button': { m: 1 } }}>
          <p>{ selection && `Selected: ${selection.text}`} </p>
          <Button size={"small"} onClick={() => add_or_remove(currentList, availableList, setCurrentList, setAvailableList)} variant="contained">
            <span class="material-icons">{!matches ? 'arrow_upward' : 'west'}</span>
             Remove 
          </Button>
          <Button size={"small"} onClick={() => add_or_remove(availableList, currentList, setAvailableList, setCurrentList)} variant="contained">
            Add 
            <span class="material-icons">{!matches ? 'arrow_downward' : 'east'}</span>
          </Button>
        </Box>
        <div>
          <h2 className="toolbar-title">Current Toolbar buttons:</h2>
          <SectionToolBar list={currentList} setSelectionfx={setCurrentSelection}/>
        </div>
      </Box>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
