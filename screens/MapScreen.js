import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'

const MapScreen = () => {
	const Stack = createNativeStackNavigator()
	const navigation = useNavigation()
	return (
		<View>
			<View style={tw`h-2/5 relative`}>
				<Map />

				<TouchableOpacity
					onPress={() => navigation.navigate('HomeScreen')}
					style={tw`p-4 absolute top-12 left-6 bg-white rounded-full`}>
					<Icon name='menu' type='feather' />
				</TouchableOpacity>
			</View>

			<View style={tw`h-3/5`}>
				<Stack.Navigator>
					<Stack.Screen
						name='NavigateCard'
						component={NavigateCard}
						options={{
							headerShown: false
						}}
					/>
					<Stack.Screen
						name='RideOptionsCard'
						component={RideOptionsCard}
						options={{
							headerShown: false
						}}
					/>
				</Stack.Navigator>
			</View>
		</View>
	)
}

export default MapScreen
