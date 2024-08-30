
import axiosInstance from "@/config/axios.config";
import { TProductType } from "@/models/product";
import { fetchProductDetailApi } from "@/services/product.service";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";

const ProductReviewModal = ({
  open,
  handleClose,
  productId,
}: {
  open: boolean;
  handleClose: () => void;
  productId: number;
}) => {
  const [product, setProduct] = useState<TProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open && productId) {
      fetchProductDetails(productId);
    }
  }, [open, productId]);

  const fetchProductDetails = async (productId: number) => {
    setLoading(true);
    fetchProductDetailApi(productId)
      ?.then((response) => {
        setProduct(response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderContent = () => {
    if (product && product.reviews.length > 0) {
      return (
        <List>
          {product.reviews.map((review, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`Rating: ${review.rating} - ${review.reviewerName}`}
                secondary={`${review.comment} - ${new Date(
                  review.date
                ).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      );
    } else {
      return (
        <ListItem>
          <ListItemText primary="No reviews available" />
        </ListItem>
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Product Reviews</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>{renderContent()}</>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductReviewModal;
