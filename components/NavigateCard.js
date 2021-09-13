import React from 'react'
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity
} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/core'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<Text style={tw`text-xl font-semibold text-center py-5`}>
				Good Morning, Oliver
			</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<View>
					<GooglePlacesAutocomplete
						placeholder='Where to?'
						debounce={400}
						styles={toInputBoxStyles}
						nearbyPlacesAPI={'GooglePlacesSearch'}
						enablePoweredByContainer={false}
						fetchDetails
						query={{ key: GOOGLE_APIKEY, language: 'en' }}
						minLength={2}
						returnKeyType='search'
						onPress={(data, details = null) => {
							dispatch(
								setDestination({
									location: details.geometry.location,
									description: data.description
								})
							)

							navigation.navigate('RideOptionsCard')
						}}
					/>
				</View>
				<NavFavourites />

				<View
					style={tw`flex-row justify-evenly py-4 mt-auto border-t border-gray-100`}>
					<TouchableOpacity
						onPress={() => navigation.navigate('RideOptionsCard')}
						style={tw`bg-black items-center justify-center flex-row w-24 px-4 py-3 rounded-full`}>
						<Icon
							name='car'
							type='font-awesome'
							color='white'
							size={16}
						/>
						<Text style={tw`text-white ml-2 text-center`}>Rides</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw`bg-gray-50 border items-center justify-center border-gray-100 flex-row w-24 px-4 py-3 rounded-full`}>
						<Icon
							name='fast-food'
							type='ionicon'
							color='black'
							size={16}
						/>
						<Text style={tw`text-black ml-2 text-center`}>Eats</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingTop: 20,
		flex: 0
	},
	textInput: {
		backgroundColor: '#eee',
		borderRadius: 6,
		fontSize: 18
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingBottom: 0
	}
})
