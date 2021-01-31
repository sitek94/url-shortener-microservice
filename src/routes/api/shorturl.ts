import { Router } from 'express';
import Item from '../../models/item-model';
import verifyUrl from '../../middleware/verify-url';

const router = Router();

router.post('/new', verifyUrl, async (req, res) => {
  try {
    // Count the docs
    const count = await Item.estimatedDocumentCount();
    if (!count) throw Error(`Failed to count the docs`);

    const urlObj = {
      short_url: count,
      original_url: req.body.url,
    };

    // Create new item
    const newItem = new Item(urlObj);

    // Save the item
    const savedItem = await newItem.save();
    if (!savedItem) throw Error(`Failed to save new item`);

    // Send response
    res.json(urlObj);
  } catch (e) {
    res.json({ msg: e.message });
  }
});

export default router;
