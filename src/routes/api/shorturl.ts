import { Router } from 'express';
import Item from '../../models/item-model';
import verifyUrl from '../../middleware/verify-url';

const router = Router();

router.post('/new', verifyUrl, async (req, res) => {
  try {
    // Check if url is already in the db
    const item = await Item.findOne({ original_url: req.body.url });
    if (item) {
      return res.json({
        original_url: item.original_url,
        short_url: item.short_url,
      });
    }

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
    return res.json(urlObj);
  } catch (e) {
    return res.json({ msg: e.message });
  }
});

router.get('/:short_url', async (req, res) => {
  try {
    // Find item by short url in the database
    const item = await Item.findOne({ short_url: req.params.short_url });
    if (!item) throw Error(`No short URL found for the given input`);

    // Redirect to the original url
    return res.redirect(item.original_url);
  } catch (e) {
    return res.json({ error: e.message });
  }
});

export default router;
