
import {
  Card,
  Thumbnail,
  Grid,
  Button,
  InlineStack,
  Text,
  BlockStack,
  Badge,
} from "@shopify/polaris";
import { Paginate } from "../component/Paginate";
export function ProductsCard({productList , loading , currentPage , setCurrentPage}) {


  const paginatedData = Paginate(5, productList, currentPage);
  console.log(paginatedData);

  return (
    <>
      <BlockStack gap="800">
        {paginatedData &&
          paginatedData.length > 0 &&
          paginatedData.map((product) => (
            <Card key={product.id}>
              <Grid
                blockAlign="start"
                columns={{ xs: 1, sm: 5, md: 6, lg: 6, xl: 6 }}
                areas={{
                  xs: ["product", "button"],
                  sm: ["product product product product product button"],
                  md: ["product product product product product button"],
                  lg: ["product product product product  product button"],
                  xl: ["product product product product product button"],
                }}
              >
                <Grid.Cell area="product">
                  <BlockStack>
                    <InlineStack gap="400">
                      {
                        <Thumbnail
                          source={
                            product.images && product.images.length > 0
                              ? product.images[0].src
                              : ""
                          }
                          size="large"
                          alt="Black choker necklace"
                        />
                      }
                      <BlockStack align="start" gap="200">
                        <Text alignment="start" variant="headingMd" as="h6">
                          {product.title}
                        </Text>
                        <InlineStack gap="200">
                          {product.product_type ? (
                            <Badge tone="info">
                              Type:{product.product_type}
                            </Badge>
                          ) : (
                            ""
                          )}
                          {product.status ? (
                            <Badge tone="success">
                              Status:{product.status}
                            </Badge>
                          ) : (
                            ""
                          )}
                        </InlineStack>
                        <InlineStack gap="200">
                          {product.variants && product.variants.length > 0 ? (
                            <>
                              <Badge>
                                Product Code:{product.variants[0].sku}
                              </Badge>
                              <Badge>
                                BarCode:{product.variants[0].barcode}
                              </Badge>
                              <Badge>Price:{product.variants[0].price}</Badge>
                            </>
                          ) : (
                            ""
                          )}
                        </InlineStack>
                      </BlockStack>
                    </InlineStack>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell area="button">
                  <Button variant="Primary">+ Add URL</Button>
                </Grid.Cell>
              </Grid>
            </Card>
          ))}
      </BlockStack>
    </>
  );
}
