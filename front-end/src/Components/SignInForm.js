import { Card, CardContent, Divider, Grid } from '@material-ui/core';
import React,{useState} from 'react';
import { Headings } from '../Support/Headings/Headings';
import {lightBorder} from '../Theme/borders'
import { SimpleTextField } from '../Support/TextFields/TextFields';
import { SimpleLinks } from '../Support/Link/Links';
import { SimpleButton } from '../Support/Buttons/Buttons';

function SignInForm(props) {
    const [email,setEmail]=useState();
    const [password,setpassword]=useState();
    const [responseFromServer,setResponseFromServer]=useState("");

    const handelSinInEvent = async (event)=>{
        const data = {
            userEmail:email,
            userPassword:password
        }
        const response = await fetch('http://localhost:3000/accountsService/loginAccount', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
          const resp = await response.json()
          console.log(resp)
          setResponseFromServer(resp.status)

    }
    return (
        <div>
                     {/* Title */}
                     <div style={{padding:'1rem'}}>
                                <Headings text={"Sign In"} fontSize={30} fontWeight={'bold'}/>
                            </div>
                            <Divider/>
                            <Grid container>
                                <Grid item xs={12} style={{padding:'1rem',backgroundColor:''}}>
                                            <SimpleTextField 
                                                value={email}
                                                setValue={setEmail}
                                                label="Email"
                                                fullWidth
                                            />
                                </Grid>
                                <Grid item xs={12} style={{padding:'1rem',backgroundColor:''}}>
                                            <SimpleTextField 
                                                value={password}
                                                setValue={setpassword}
                                                label="Password"
                                                fullWidth
                                                
                                            />
                                </Grid>
                                <Grid item xs={12} style={{textAlign:'center'}}>
                                           <SimpleButton
                                                name="Sin in"
                                                handelClick={(e)=>{
                                                    // setDoHaveAccount(!doHaveAccount)
                                                    handelSinInEvent(e);
                                                }}
                                           />
                                </Grid>
                                <Grid item xs={12} style={{textAlign:'center'}}>
                                          <SimpleLinks
                                            name={"Don't have account ?"}
                                            handelClick={()=>{
                                                props.setDoHaveAccount(!props.doHaveAccount)
                                            }}
                                          />
                                </Grid>
                                <Grid item xs={12} style={{textAlign:'center'}}>
                                         {responseFromServer}
                                </Grid>
                            </Grid>
                           
        </div>
    );
}

export default SignInForm;