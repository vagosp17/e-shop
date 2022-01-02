import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailsScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.route.params.productId;
  const product = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title={"Add to Cart"}
          onPress={() => {
            dispatch(cartActions.addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    fontFamily: "open-sans",
    textAlign: "center",
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});
