const Pet = require('../Model/PetModel');
const fs = require('fs');
const path = require('path');
const { sendEmail } = require('../utils/email');

const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;
    const { filename } = req.file;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      filename,
      status: 'Pending'
    });

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone, status } = req.body;

    const updates = {};
    if (typeof email !== 'undefined') {
      updates.email = email;
    }
    if (typeof phone !== 'undefined') {
      updates.phone = phone;
    }
    if (typeof status !== 'undefined') {
      updates.status = status;
    }

    const pet = await Pet.findByIdAndUpdate(id, updates, { new: true });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    if (updates.status && pet.email) {
      const statusLower = updates.status.toLowerCase();
      let subject;
      let html;
      let text;

      if (statusLower === 'adopted') {
        subject = `Great news! Your adoption request for ${pet.name} is approved`;
        html = `
          <p>Hi there,</p>
          <p>We're excited to let you know that your adoption request for <strong>${pet.name}</strong> has been approved.</p>
          <p>Our team will reach out soon at ${pet.phone ? `<strong>${pet.phone}</strong>` : 'your registered phone number'} to coordinate the next steps.</p>
          <p>Thank you for giving ${pet.name} a loving home!</p>
          <p>— Pet's Paradise Team</p>
        `;
        text = `Hi there,

We're excited to let you know that your adoption request for ${pet.name} has been approved.
Our team will reach out soon${pet.phone ? ` at ${pet.phone}` : ''} to coordinate the next steps.

Thank you for giving ${pet.name} a loving home!

— Pet's Paradise Team`;
      } else if (statusLower === 'approved') {
        subject = `Your pet listing for ${pet.name} has been approved`;
        html = `
          <p>Hi there,</p>
          <p>Your request to list <strong>${pet.name}</strong> for adoption on Pet's Paradise has been approved.</p>
          <p>We will get in touch with you at ${pet.phone ? `<strong>${pet.phone}</strong>` : 'your registered phone number'} if we need any additional details.</p>
          <p>Thank you for helping us find a forever home for ${pet.name}.</p>
          <p>— Pet's Paradise Team</p>
        `;
        text = `Hi there,

Your request to list ${pet.name} for adoption on Pet's Paradise has been approved.
We will get in touch with you${pet.phone ? ` at ${pet.phone}` : ''} if we need any additional details.

Thank you for helping us find a forever home for ${pet.name}.

— Pet's Paradise Team`;
      }

      if (subject) {
        await sendEmail({
          to: pet.email,
          subject,
          text,
          html
        });
      }
    }

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allPets = async (reqStatus, req, res) => {
  try {
    const data = await Pet.find({ status: reqStatus }).sort({ updatedAt: -1 });
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    const filePath = path.join(__dirname, '../images', pet.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
};
