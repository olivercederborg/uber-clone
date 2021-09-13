import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	FlatList,
	Image
} from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
	{
		id: 'Uber-X-1',
		title: 'Uber X',
		multiplier: 1,
		image: 'https://links.papareact.com/3pn'
	},
	{
		id: 'Uber-XL-2',
		title: 'Uber XL',
		multiplier: 1.2,
		image: 'https://links.papareact.com/5w8'
	},
	{
		id: 'Uber-LUX-3',
		title: 'Uber LUX',
		multiplier: 1.75,
		image: 'https://links.papareact.com/7pf'
	}
]

const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
	const navigation = useNavigation()
	const [selected, setSelected] = useState(null)
	const travelTimeInformation = useSelector(selectTravelTimeInformation)

	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<View style={tw`border-b border-gray-200`}>
				<TouchableOpacity
					style={tw`absolute top-2 left-5 py-4 z-20`}
					onPress={() => navigation.navigate('NavigateCard')}>
					<Icon name='chevron-left' type='fontawesome' />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl font-semibold`}>
					Select a Ride - {travelTimeInformation?.distance.text}
				</Text>
			</View>

			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						style={tw`flex-row justify-between items-center px-10 ${
							selected == item && 'bg-gray-200'
						}`}>
						<Image
							source={{ uri: item.image }}
							style={{ width: 100, height: 100, resizeMode: 'contain' }}
						/>
						<View style={tw`-ml-6`}>
							<Text style={tw`text-xl font-semibold`}>{item.title}</Text>
							<Text>
								Travel Time: {travelTimeInformation?.duration.text}
							</Text>
						</View>
						<Text style={tw`text-xl font-semibold`}>
							{new Intl.NumberFormat('en-eu', {
								style: 'currency',
								currency: 'EUR'
							}).format(
								(travelTimeInformation?.duration.value *
									SURGE_CHARGE_RATE *
									item.multiplier) /
									100
							)}
						</Text>
					</TouchableOpacity>
				)}
			/>

			<View style={tw`border-t border-gray-200 mt-auto`}>
				<TouchableOpacity
					disabled={!selected}
					style={tw`bg-black py-3 m-3 rounded-lg ${
						!selected && 'bg-gray-300'
					}`}>
					<Text style={tw`text-center text-white text-xl`}>
						Choose {selected?.title}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default RideOptionsCard
