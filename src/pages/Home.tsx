import { IonCol, IonContent, IonGrid, IonRow, IonText } from "@ionic/react"
import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"
import "./home.css"

const BASE_URL = "http://localhost:4001"

function Home() {
  const [sensor, setSensor] = useState<number[]>([])

  useEffect(() => {
    const socket = socketIOClient(BASE_URL)
    socket.on("reading", (data: number[]) => setSensor(data))
    socket.emit("subscribeToServer", 1000)
  }, [])

  return (
    <IonContent>
      <div className="ion-padding">
        <h1>React Socket.io Example</h1>
      </div>
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Time</IonText>
          </IonCol>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Temperature</IonText>
          </IonCol>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Humidity</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeMd="2" className="col-border ion-text-center">
            {sensor[0] && format(sensor[0], "hh:mm:ss a")}
          </IonCol>
          <IonCol sizeMd="2" className="col-border ion-text-center">
            {sensor[1]}
          </IonCol>
          <IonCol sizeMd="2" className="col-border ion-text-center">
            {sensor[2]}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default Home
