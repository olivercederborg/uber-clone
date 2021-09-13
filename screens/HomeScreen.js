import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'

const HomeScreen = () => {
	const dispatch = useDispatch()
	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`px-5`}>
				<Image
					style={{ width: 100, height: 100, resizeMode: 'contain' }}
					source={{
						uri: 'https://links.papareact.com/gzs'
					}}
				/>

				<GooglePlacesAutocomplete
					placeholder='Where from?'
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400}
					query={{ key: GOOGLE_APIKEY, language: 'en' }}
					minLength={2}
					enablePoweredByContainer={false}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description
							})
						)

						dispatch(setDestination(null))
					}}
					fetchDetails
					returnKeyType={'search'}
					styles={{
						container: {
							flex: 0
						},
						textInput: {
							fontSize: 18
						}
					}}
				/>

				<NavOptions />
				<NavFavourites />
			</View>
		</SafeAreaView>
	)
}

export default HomeScreen
