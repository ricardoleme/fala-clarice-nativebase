import React, { useState, useEffect } from 'react'
import { NativeBaseProvider, Image, ScrollView, Box, Column, Row, Text, Button, Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'

import clarice from './src/assets/images/clarice.png'


export default function App() {
  const [frase, setFrase] = useState('')
  const [falando, setFalando] = useState(false)
  let frases = [
    "Até cortar os próprios defeitos pode ser perigoso. Nunca se sabe qual é o defeito que sustenta nosso edifício inteiro.",
    "Que ninguém se engane, só se consegue a simplicidade através de muito trabalho.",
    "Tenho várias caras. Uma é quase bonita, outra é quase feia. Sou um o quê? Um quase tudo.",
    "A gente tem o direito de deixar o barco correr. As coisas se arranjam, não é preciso empurrar com tanta força.",
    "Amar não acaba. É como se o mundo estivesse a minha espera. E eu vou ao encontro do que me espera.",
    "Mas há a vida que é para ser intensamente vivida. Há o amor. Que tem que ser vivido até a última gota. Sem nenhum medo. Não mata.",
    "Toda mulher leva um sorriso no rosto e mil segredos no coração.",
    "Não tenho tempo pra mais nada, ser feliz me consome muito.",
    "Ela acreditava em anjo e, porque acreditava, eles existiam."
  ]

  useEffect(()=> {

    Speech.speak(frase, {
      language: 'pt',
      onStart: iniciaFala,
      onDone: finalizaFala
    })
},[frase])

  const iniciaFala = () => {
    setFalando(true)
  }

  const finalizaFala = () => {
    setFalando(false)
    setFrase('')
  }

  async function falar() {
    setFrase(frases[parseInt(Math.random() * frases.length)])   
  }

  function parar() {
    Speech.stop()
  }

  return (
    <NativeBaseProvider>
      <ScrollView >
        <Box flex={1} _dark={{ bg: 'coolGray.800' }} _light={{ bg: 'warmGray.50' }}>
          <Column alignItems="center" >
            <Row _dark={{ bg: "rose.800" }} _light={{ bg: "indigo.500" }} px="1" py="3" my="3" justifyContent="space-between" alignItems="center" w="100%" maxW="sm" shadow={6}>
              <Text color="white" fontSize="20" fontWeight="bold">App FalaClarice</Text>
            </Row>
            <Column>
              <Text fontSize="xl" fontWeight="bold" color="indigo.800" my="5">Fala Clarice</Text>
              <Text fontSize="sm" my="2">App que fala frases randômicas de Clarice Lispector</Text>
              <Image key='clarice' size='300' resizeMode='cover' alt='Clarice Lispector' borderRadius={150} source={clarice} mt="2" />
              <Text fontSize="lg" color="indigo.600" ml="2" mr="2">{frase}</Text>
            </Column>
            <Row space={4} my={2}>
              <Button leftIcon={<Icon as={Ionicons} name="chatbox-outline" size="sm" />} onPress={falar} isLoading={falando}>Ouvir a Frase</Button>
              <Button colorScheme="secondary" leftIcon={<Icon as={Ionicons} name="ear-outline" size="sm" onPress={parar} />}>Parar</Button>
            </Row>
          </Column>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  )
}