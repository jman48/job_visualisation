class AddLanguageToListings < ActiveRecord::Migration
  def change
    add_column :listing, :language, :string
  end
end
